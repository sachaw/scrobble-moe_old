import { hashPassword } from "app/auth/auth-utils"
import { RegisterInput, RegisterInputType } from "app/auth/validations"
import { Ctx } from "blitz"
import db from "db"

export default async function register(input: RegisterInputType, ctx: Ctx) {
  // This throws an error if input is invalid
  const { username, password } = RegisterInput.parse(input)

  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: { username, password: hashedPassword, role: "user" },
    select: { id: true, username: true, role: true },
  })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
