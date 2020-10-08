import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
const Home: BlitzPage = () => {
  return <h1>Landing</h1>
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
