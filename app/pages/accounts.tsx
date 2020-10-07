import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { Suspense } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { VStack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core"

function Account({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" {...rest}>
      <Flex justify="space-between">
        <Box userSelect="none">
          <Heading fontSize="xl">{title}</Heading>
          <Text mt={4}>{desc}</Text>
        </Box>
        <Box my="auto">
          <Button mr={2} variant="ghost">
            <FaPen />
          </Button>
          <Button variant="ghost">
            <FaTrash />
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

const Accounts: BlitzPage = () => {
  return (
    <VStack spacing={4} align="stretch">
      <Account title="Server 1" desc="something" />
      <Account title="Server 2" desc="something" />
    </VStack>
  )
}

Accounts.getLayout = (page) => <Layout title="Accounts">{page}</Layout>

export default Accounts
