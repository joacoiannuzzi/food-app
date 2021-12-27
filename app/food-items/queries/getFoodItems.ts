import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetFoodItemsInput
  extends Pick<Prisma.FoodItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFoodItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: foodItems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.foodItem.count({ where }),
      query: (paginateArgs) => db.foodItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      foodItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
