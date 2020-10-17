import Axios from "axios"
import { Ctx } from "blitz"
import db from "db"
import { decode } from "jsonwebtoken"

export default async function linkAnilist({ token }, ctx: Ctx) {
  ctx.session.authorize()

  Axios.post("https://anilist.co/api/v2/oauth/token", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    grant_type: "authorization_code",
    client_id: process.env.ANILIST_CLIENT_ID,
    client_secret: process.env.ANILIST_CLIENT_SECRET,
    redirect_uri: process.env.ANILIST_CLIENT_URL,
    code: token,
  })
    .then(
      async (response) => {
        const tokenData = decode(response.data.access_token) as any
        return await db.linkedAccount.create({
          data: {
            service: "ANILIST",
            accountId: tokenData.sub,
            accessToken: response.data.access_token,
            accessTokenExpires: new Date(Date.now() + (tokenData as any).exp).toISOString(),
            refreshToken: response.data.refresh_token,
            user: {
              connect: {
                id: ctx.session.userId as string,
              },
            },
          },
        })
      },
      (error) => {
        throw new Error(error)
      }
    )
    .catch((error) => {
      throw new Error(error.response.data)
    })
}
