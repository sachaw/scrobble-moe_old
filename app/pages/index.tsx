import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
const Home: BlitzPage = () => {
  return <h1>Landing</h1>
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
