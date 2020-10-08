import { RemoveServerInput, RemoveServerInputType } from "app/servers/validations"
import { AuthorizationError, Ctx } from "blitz"
import db from "db"

export default async function removeServer(input: RemoveServerInputType, ctx: Ctx) {
  ctx.session.authorize()
  const { id } = RemoveServerInput.parse(input)

  const server = await db.plexServer.findOne({ where: { id } })
  if (server?.ownerId === ctx.session.userId) {
    return await db.plexServer.delete({
      where: {
        id,
      },
    })
  }

  throw new AuthorizationError(`You do not have permission to remove the server: ${id}`)

  return server
}
