import { Head, BlitzLayout } from "blitz"
import { Sidebar } from "../components/Sidebar"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "food-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen flex">
        <Sidebar />
        <div className="flex-1 h-screen">{children}</div>
      </div>
    </>
  )
}

export default Layout
