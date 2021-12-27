import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateOrderItemDetail = z.object({
  id: z.number(),
  quantity: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateOrderItemDetail),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderItemDetail = await db.orderItemDetail.update({ where: { id }, data })

    return orderItemDetail
  }
)
