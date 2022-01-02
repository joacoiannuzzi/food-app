import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateOrderItemDetail = z.object({
  quantity: z.number(),
  userId: z.number(),
  orderItemId: z.number(),
  hasPayed: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(CreateOrderItemDetail),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItemDetail = await db.orderItemDetail.create({ data: input })

    return orderItemDetail
  }
)
