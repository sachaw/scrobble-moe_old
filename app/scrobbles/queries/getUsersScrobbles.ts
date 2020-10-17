import { Ctx } from "blitz"
import db from "db"

export default async function getUsersScrobbles(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  return await db.scrobbleItem.findMany({
    where: { userId: ctx.session!.userId },
    include: {
      attempts: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 7,
  })
}
