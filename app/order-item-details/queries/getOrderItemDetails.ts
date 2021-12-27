import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOrderItemDetailsInput
  extends Pick<Prisma.OrderItemDetailFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrderItemDetailsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: orderItemDetails,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.orderItemDetail.count({ where }),
      query: (paginateArgs) => db.orderItemDetail.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      orderItemDetails,
      nextPage,
      hasMore,
      count,
    }
  }
)
