import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateFoodItem = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateFoodItem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const foodItem = await db.foodItem.update({ where: { id }, data })

    return foodItem
  }
)
