import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, ctx: Ctx) {
  if (!ctx.session?.userId) return null

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, username: true, role: true },
  })

  return user
}
