import { Link as BlitzLink, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import { Suspense } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { VStack, Box, Heading, Text, Flex, Button, Stack, Link, Skeleton } from "@chakra-ui/core"
import { UseUsersServers } from "app/servers/hooks/useUsersServers"
import { FaLayerGroup } from "react-icons/fa"

function ServerCards() {
  const servers = UseUsersServers()

  {
    return servers && servers.length ? (
      <VStack spacing={4} align="stretch">
        {servers?.map((server) => {
          return (
            <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
              <Flex justify="space-between">
                <Box userSelect="none">
                  <Heading fontSize="xl">{server.name}</Heading>
                  <Text mt={4}>{server.uuid}</Text>
                </Box>
                <Box my="auto">
                  <Link as={BlitzLink} href={"/servers/edit/" + server.id}>
                    <Button mr={2} variant="ghost">
                      <FaPen />
                    </Button>
                  </Link>
                  <Button variant="ghost">
                    <FaTrash />
                  </Button>
                </Box>
              </Flex>
            </Box>
          )
        })}
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Stack spacing={4}>
            <Box m={"auto"}>
              <FaLayerGroup size={70} />
            </Box>
            <Link as={BlitzLink} href="/servers/new">
              <Button variant="ghost">Add Server</Button>
            </Link>
          </Stack>
        </Box>
      </VStack>
    ) : (
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Stack spacing={4}>
          <Box m={"auto"}>
            <FaLayerGroup size={70} />
          </Box>
          <Link as={BlitzLink} href="/servers/new">
            <Button variant="ghost">Add Server</Button>
          </Link>
        </Stack>
      </Box>
    )
  }
}

const Servers: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton height="20px" />}>
      <ServerCards />
    </Suspense>
  )
}

Servers.getLayout = (page) => <Layout title="Servers">{page}</Layout>

export default Servers
