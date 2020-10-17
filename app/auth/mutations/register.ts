import { hashPassword } from "app/auth/auth-utils"
import { RegisterInput, RegisterInputType } from "app/auth/validations"
import { Ctx } from "blitz"
import db from "db"

export default async function register(input: RegisterInputType, ctx: Ctx) {
  // This throws an error if input is invalid
  const { username, plexUsername, password } = RegisterInput.parse(input)

  const hashedPassword = await hashPassword(password)

  const existingUser = await db.user.findOne({ where: { username } })

  if (!!existingUser) throw new Error("User already exists")

  const user = await db.user.create({
    data: { username, plexUsername, password: hashedPassword, role: "user" },
    select: { id: true, username: true, role: true },
  })

  await ctx.session!.create({ userId: user.id, roles: [user.role] })

  return user
}
