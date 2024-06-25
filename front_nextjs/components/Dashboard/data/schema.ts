import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id : z.string(),
  name : z.string(),
  email : z.string(),
  // medecin : z.string(),
  // date_naissance : z.date() || null,
  // created_at: z.date(),
  status: z.string(),
  // label: z.string(),
  // latest_exam: z.string() || '',
})

export type Task = z.infer<typeof taskSchema>