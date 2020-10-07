import db from "db"
import { EditServerInput, EditServerInputType } from "app/servers/validations"
import { Ctx } from "blitz"

export default async function editServer(input: EditServerInputType, ctx: Ctx) {
  ctx.session.authorize()
  const { id, ip, name, uuid } = EditServerInput.parse(input)

  const server = await db.plexServer.update({
    data: {
      ip,
      name,
      uuid,
      owner: {
        connect: {
          id: ctx.session?.userId,
        },
      },
    },
    where: {
      id,
    },
  })

  return server
}
