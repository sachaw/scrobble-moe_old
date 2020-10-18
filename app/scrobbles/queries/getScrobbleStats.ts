import { Ctx } from "blitz"
import db from "db"

export default async function getScrobbleStats(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  const weeklyCount = await db.scrobbleItem.count({
    where: {
      userId: ctx.session!.userId,
      updatedAt: {
        gte: new Date(Date.now() + -7 * 24 * 3600 * 1000),
      },
    },
  })

  return {
    weekly: weeklyCount,
  }
}
