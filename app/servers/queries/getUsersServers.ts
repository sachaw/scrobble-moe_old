import db from "db"
import { Ctx } from "blitz"

export default async function getUsersServers(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  return await db.plexServer.findMany({
    where: { ownerId: ctx.session!.userId },
  })
}
