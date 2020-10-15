import * as z from "zod"

export const RemoveLinkedAccountInput = z.object({
  id: z.string(),
})
export type RemoveLinkedAccountInputType = z.infer<typeof RemoveLinkedAccountInput>
