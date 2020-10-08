import { EditServerInput, EditServerInputType } from "app/servers/validations"
import { Ctx } from "blitz"
import db from "db"

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
