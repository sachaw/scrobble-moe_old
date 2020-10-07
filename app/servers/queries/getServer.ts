import db, { FindOnePlexServerArgs } from "db"
import { Ctx, NotFoundError, AuthorizationError } from "blitz"

type GetServerInput = {
  where: FindOnePlexServerArgs["where"]
}

export default async function getServer({ where }: GetServerInput, ctx: Ctx) {
  ctx.session.authorize()
  const server = await db.plexServer.findOne({ where })
  if (!server) throw new NotFoundError(`Server with id ${where.id} does not exist`)
  if (server.ownerId !== ctx.session.userId)
    throw new AuthorizationError(`You do not have permission to edit the server: ${where.id}`)
  return server
}
