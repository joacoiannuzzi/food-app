import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateOrder = z.object({
  id: z.number(),
  description: z.string(),
  closesAt: z.date(),
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const order = await db.order.update({ where: { id }, data })

    return order
  }
)
