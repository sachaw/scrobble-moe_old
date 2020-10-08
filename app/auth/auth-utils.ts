import { AuthenticationError, NotFoundError } from "blitz"
import db from "db"
import SecurePassword from "secure-password"

const SP = new SecurePassword()

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP.hash(Buffer.from(password))
  return hashedBuffer.toString("base64")
}
export const verifyPassword = async (hashedPassword: string, password: string) => {
  try {
    return await SP.verify(Buffer.from(password), Buffer.from(hashedPassword, "base64"))
  } catch (error) {
    console.error(error)
    return false
  }
}

export const authenticateUser = async (username: string, password: string) => {
  const user = await db.user.findOne({ where: { username } })

  if (!user || !user.password) throw new NotFoundError("User does not exist")

  switch (await verifyPassword(user.password, password)) {
    case SecurePassword.VALID:
      break
    case SecurePassword.VALID_NEEDS_REHASH:
      // Upgrade hashed password with a more secure hash
      const improvedHash = await hashPassword(password)
      await db.user.update({ where: { id: user.id }, data: { password: improvedHash } })
      break
    default:
      throw new AuthenticationError("Invalid Username/Password")
  }

  const { password: omitted, ...rest } = user
  return rest
}
