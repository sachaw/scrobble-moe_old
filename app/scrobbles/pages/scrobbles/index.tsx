import { Container } from "@chakra-ui/core"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { FaKey, FaPen, FaPlayCircle, FaRegPlayCircle, FaTrash, FaUser } from "react-icons/fa"

const Scrobbles: BlitzPage = () => {
  return <Container></Container>
}

Scrobbles.getLayout = (page) => <Layout title="Scrobbles | Scrobble.moe">{page}</Layout>

export default Scrobbles
