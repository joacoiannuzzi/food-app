import { Head, BlitzLayout } from "blitz"
import { Sidebar } from "../components/Sidebar"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "food-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {children}
    </>
  )
}

export default Layout
