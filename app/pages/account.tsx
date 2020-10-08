import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/core"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { FaPen, FaTrash } from "react-icons/fa"

const Account: BlitzPage = () => {
  return <p>Account</p>
}

Account.getLayout = (page) => <Layout title="Account">{page}</Layout>

export default Account
