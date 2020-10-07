import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import { IncomingForm } from "formidable"
import { payload } from "utils/webhookInterface"
import { PrismaClient } from "@prisma/client"
import { scrobble } from "utils/scrobblers/anilist"

const webhook = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const form = new IncomingForm()
  const payload = (await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, _files) => {
      err && reject(err)
      !fields.payload && reject("Empty payload")
      try {
        resolve(JSON.parse(fields.payload as string))
      } catch (error) {
        reject("Malformed payload")
      }
    })
  }).catch((error) => {
    return res.status(500).json({ error })
  })) as payload
  const providerMediaIdRegexMatch = payload.Metadata.guid.match(
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
      uuid: payload.Server.uuid,
    },
  })
  if (!server) return res.status(403).json({ error: "Server not registered" })

  if (server.ip !== ip && server.ip !== "*")
    return res.status(403).json({ error: "IP address not allowed" })

  if (payload.event !== "media.scrobble")
    return res.status(200).json({ data: "Skipping event: " + payload.event })

  const user = await client.user.findOne({
    where: {
      plexUsername: payload.Account.title,
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
      payload.Metadata.index,
      account.accessToken,
      client
    )
    return res.status(200).json(response)
  }

  return res.status(200).json({ data: "user or account not tracked" })
}

export default webhook
