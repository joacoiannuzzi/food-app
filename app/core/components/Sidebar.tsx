import { Image, Link, Routes } from "blitz"
import todayIcon from "public/today-icon.svg"
import restaurantIcon from "public/restaurant-icon.svg"
import ordersIcon from "public/orders-icon.svg"
import logo from "public/logo.svg"

export const Sidebar = () => {
  return (
    <nav className="bg-white-500 border-r-2 border-r-slate-500 | w-28 pt-4 | flex flex-col items-center gap-14">
      <div className="w-20 h-5">
        <Image src={logo} alt="logo" />
      </div>
      <Link href={Routes.TodayPage()}>
        <div className="rounded-full | bg-amber-500 | p-4 | cursor-pointer hover:bg-orange-400">
          <div className="w-6 h-6">
            <Image src={todayIcon} alt="today" />
          </div>
        </div>
      </Link>
      <Link href={Routes.RestaurantsPage()}>
        <div className="w-6 h-6 | cursor-pointer">
          <Image src={restaurantIcon} alt="restaurant" />
        </div>
      </Link>
      <Link href={Routes.OrdersPage()}>
        <div className="w-6 h-6 | cursor-pointer">
          <Image src={ordersIcon} alt="orders" />
        </div>
      </Link>
    </nav>
  )
}
