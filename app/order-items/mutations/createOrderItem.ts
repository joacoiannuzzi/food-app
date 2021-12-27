import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateOrderItem = z.object({
  description: z.string(),
  orderId: z.number(),
  foodItemId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateOrderItem), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const orderItem = await db.orderItem.create({ data: input })

  return orderItem
})
