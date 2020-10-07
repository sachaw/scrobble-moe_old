import * as z from "zod"

export const LoginInput = z.object({
  username: z.string(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const RegisterInput = z.object({
  username: z.string(),
  password: z.string(),
})
export type RegisterInputType = z.infer<typeof RegisterInput>
