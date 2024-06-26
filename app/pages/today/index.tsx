import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRestaurants from "app/restaurants/queries/getRestaurants"
import { OrderCard } from "../../core/components/OrderCard"
import { OrderCardList } from "../../core/components/OrderCardList"

const ITEMS_PER_PAGE = 100

// export const RestaurantsList = () => {
//   const router = useRouter()
//   const page = Number(router.query.page) || 0
//   const [{ restaurants, hasMore }] = usePaginatedQuery(getRestaurants, {
//     orderBy: { id: "asc" },
//     skip: ITEMS_PER_PAGE * page,
//     take: ITEMS_PER_PAGE,
//   })
//
//   const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
//   const goToNextPage = () => router.push({ query: { page: page + 1 } })
//
//   return (
//     <div>
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li key={restaurant.id}>
//             <Link href={Routes.ShowRestaurantPage({ restaurantId: restaurant.id })}>
//               <a>{restaurant.name}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//
//       <button disabled={page === 0} onClick={goToPreviousPage}>
//         Previous
//       </button>
//       <button disabled={!hasMore} onClick={goToNextPage}>
//         Next
//       </button>
//     </div>
//   )
// }

const TodayPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Today Orders</title>
      </Head>

      <div>
        <OrderCardList />

        {/*<Suspense fallback={<div>Loading...</div>}>*/}
        {/*  <RestaurantsList />*/}
        {/*</Suspense>*/}
      </div>
    </>
  )
}

TodayPage.authenticate = true
TodayPage.getLayout = (page) => <Layout>{page}</Layout>

export default TodayPage
