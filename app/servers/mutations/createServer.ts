import db from "db"
import { NewServerInput, NewServerInputType } from "app/servers/validations"
import { Ctx } from "blitz"

export default async function createServer(input: NewServerInputType, ctx: Ctx) {
  ctx.session.authorize()
  const { ip, name, uuid } = NewServerInput.parse(input)

  const server = await db.plexServer.create({
    data: {
      ip,
      name,
      uuid,
      owner: {
        connect: {
          id: ctx.session.userId as string,
        },
      },
    },
  })

  return server
}
