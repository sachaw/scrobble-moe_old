import * as z from "zod"

export const NewServerInput = z.object({
  ip: z.string(),
  name: z.string(),
  uuid: z.string(),
})
export type NewServerInputType = z.infer<typeof NewServerInput>

export const EditServerInput = z.object({
  id: z.string(),
  ip: z.string().optional(),
  name: z.string().optional(),
  uuid: z.string().optional(),
})
export type EditServerInputType = z.infer<typeof EditServerInput>

export const RemoveServerInput = z.object({
  id: z.string(),
})
export type RemoveServerInputType = z.infer<typeof RemoveServerInput>
