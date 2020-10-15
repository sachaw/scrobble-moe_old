import { log } from "@blitzjs/display"
import { PrismaClient } from "@prisma/client"
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import { IncomingForm } from "formidable"
import { scrobble } from "utils/scrobblers/anilist"
import { payload } from "utils/webhookInterface"

const webhook = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const data = req.body.split("\n") as Array<any>
  const payloadData = JSON.parse(data.sort((a, b) => b.length - a.length)[0]) as payload
  // const form = new IncomingForm()
  // const payload = (await new Promise((resolve, reject) => {
  //   form.parse(req, (err, fields, _files) => {
  //     err && reject(err)
  //     !fields.payload && reject("Empty payload")
  //     try {
  //       resolve(JSON.parse(fields.payload as string))
  //     } catch (error) {
  //       reject("Malformed payload")
  //     }
  //   })
  // }).catch((error) => {
  //   return res.status(500).json({ error })
  // })) as payload
  const providerMediaIdRegexMatch = payloadData.Metadata.guid.match(
    /me\.sachaw\.agents\.anilist:\/\/(?<id>.*)\/[0-9]\//
  )
  if (!providerMediaIdRegexMatch?.groups?.id)
    return res.status(200).json({
      data: "Skipping event, not from library using AniList metadata provider",
    })

  const ip = req.connection.remoteAddress
  const client = new PrismaClient()
  client.$connect()
  const server = await client.plexServer.findOne({
    where: {
      uuid: payloadData.Server.uuid,
    },
  })
  log.info(payloadData.event)
  if (!server) return res.status(403).json({ error: "Server not registered" })

  if (server.ip !== ip && server.ip !== "*")
    return res.status(403).json({ error: "IP address not allowed" })

  if (payloadData.event !== "media.scrobble")
    return res.status(200).json({ data: "Skipping event: " + payloadData.event })

  const user = await client.user.findOne({
    where: {
      plexUsername: payloadData.Account.title,
    },
    include: {
      linkedAccounts: true,
    },
  })

  if (!user) return res.status(403).json({ error: "Plex username not linked to any account" })
  //change to a switch to support multiple providers
  const account = user.linkedAccounts.find((account: any) => account.service === "ANILIST")

  if (account) {
    const response = await scrobble(
      providerMediaIdRegexMatch.groups.id,
      account.accountId,
      user.id,
      payloadData.Metadata.index,
      account.accessToken,
      client
    )
    return res.status(200).json(response)
  }

  return res.status(200).json({ data: "user or account not tracked" })
}

export default webhook
