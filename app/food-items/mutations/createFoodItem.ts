import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateFoodItem = z.object({
  name: z.string(),
  description: z.string(),
  restaurantId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateFoodItem), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const foodItem = await db.foodItem.create({ data: input })

  return foodItem
})
