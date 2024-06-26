import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteOrderItem = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteOrderItem),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItem = await db.orderItem.deleteMany({ where: { id } })

    return orderItem
  }
)
