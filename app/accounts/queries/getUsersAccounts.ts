import { Ctx } from "blitz"
import db from "db"

export default async function getUsersAccounts(_ = null, ctx: Ctx) {
  ctx.session.authorize()

  return await db.linkedAccount.findMany({
    where: { userId: ctx.session!.userId },
  })
}
