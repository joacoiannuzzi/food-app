import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteFoodItem = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteFoodItem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const foodItem = await db.foodItem.deleteMany({ where: { id } })

  return foodItem
})
