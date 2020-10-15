import { RemoveLinkedAccountInput, RemoveLinkedAccountInputType } from "app/accounts/validations"
import { AuthorizationError, Ctx } from "blitz"
import db from "db"

export default async function removeLinkedAccount(input: RemoveLinkedAccountInputType, ctx: Ctx) {
  ctx.session.authorize()
  const { id } = RemoveLinkedAccountInput.parse(input)

  const linkedAccount = await db.linkedAccount.findOne({ where: { id } })
  if (linkedAccount?.userId === ctx.session.userId) {
    return await db.linkedAccount.delete({
      where: {
        id,
      },
    })
  }

  throw new AuthorizationError(`You do not have permission to remove the linked account: ${id}`)

  return linkedAccount
}
