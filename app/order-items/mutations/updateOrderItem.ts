import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateOrderItem = z.object({
  id: z.number(),
  description: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateOrderItem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItem = await db.orderItem.update({ where: { id }, data })

    return orderItem
  }
)
