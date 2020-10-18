import { Ctx } from "blitz"
import db, { FindManyScrobbleItemArgs } from "db"

export default async function getUsersScrobbles(input: FindManyScrobbleItemArgs, ctx: Ctx) {
  ctx.session.authorize()

  // input.where.userId = ctx.session!.userId

  return await db.scrobbleItem.findMany(
    Object.assign(input, {
      where: { userId: ctx.session!.userId },
    } as FindManyScrobbleItemArgs)
  )
}
