import Landing from "app/components/Landing"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
const Home: BlitzPage = () => {
  return <Landing />
}

Home.getLayout = (page) => <Layout title="Scrobble.moe">{page}</Layout>

export default Home
