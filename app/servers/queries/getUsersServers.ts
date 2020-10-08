import { Ctx } from "blitz"
import db from "db"

export default async function getUsersServers(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  return await db.plexServer.findMany({
    where: { ownerId: ctx.session!.userId },
  })
}
