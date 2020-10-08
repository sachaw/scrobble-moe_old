import { Box, Button, Flex, Heading, Link, Skeleton, Stack, Text, VStack } from "@chakra-ui/core"
import Layout from "app/layouts/Layout"
import removeServer from "app/servers/mutations/removeServer"
import getUsersServers from "app/servers/queries/getUsersServers"
import { Link as BlitzLink, BlitzPage, invalidateQuery, useMutation, useQuery } from "blitz"
import { Suspense } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { FaLayerGroup } from "react-icons/fa"

function ServerCards() {
  const [servers, { refetch }] = useQuery(getUsersServers, null)
  const [removeServerMutation] = useMutation(removeServer)

  return (
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
                <Button
                  onClick={async () => {
                    await removeServerMutation({
                      id: server.id,
                    })
                  }}
                  variant="ghost"
                >
                  <FaTrash />
                </Button>
              </Box>
            </Flex>
          </Box>
        )
      })}
      {!servers.length && (
        <Box userSelect={"none"} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
          <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
            No Servers.
          </Heading>
        </Box>
      )}
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
  )
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
