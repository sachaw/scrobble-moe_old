import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  Heading,
  IconButton,
  Link,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/core"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import removeServer from "app/servers/mutations/removeServer"
import getUsersServers from "app/servers/queries/getUsersServers"
import { Link as BlitzLink, BlitzPage, invoke, useQuery } from "blitz"
import { Suspense } from "react"
import { FaClipboard, FaPen, FaTrash } from "react-icons/fa"
import { FaLayerGroup } from "react-icons/fa"

function ServerCards() {
  const [servers, { refetch }] = useQuery(getUsersServers, null)

  return (
    <VStack spacing={4} align="stretch">
      <Card flexDir="column">
        <Heading>Servers</Heading>
        <Text>Register your server and add the following webhook to start scrobbling</Text>
        <ButtonGroup mt={2} size="sm" isAttached>
          <Button w="full" mr="-px">
            https://webhook.scrobble.moe/
          </Button>
          <IconButton aria-label="Copy" icon={<FaClipboard />} />
        </ButtonGroup>
      </Card>
      {servers?.map((server) => (
        <Card key={server.id} justify>
          <Box userSelect="none">
            <Heading fontSize="xl">{server.name}</Heading>
            <Text mt={4}>{server.uuid.slice(0, 20) + "..."}</Text>
          </Box>
          <Box my="auto">
            <Link as={BlitzLink} href={"/servers/edit/" + server.id}>
              <Button mr={2} variant="ghost">
                <FaPen />
              </Button>
            </Link>
            <Button
              onClick={async () => {
                await invoke(removeServer, {
                  id: server.id,
                })
                refetch()
              }}
              variant="ghost"
            >
              <FaTrash />
            </Button>
          </Box>
        </Card>
      ))}
      {!servers.length && (
        <Card>
          <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
            No Servers.
          </Heading>
        </Card>
      )}
      <Card>
        <Stack w="full" spacing={4}>
          <Box m={"auto"}>
            <FaLayerGroup size={70} />
          </Box>
          <Link as={BlitzLink} href="/servers/new">
            <Button variant="ghost">Add Server</Button>
          </Link>
        </Stack>
      </Card>
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

Servers.getLayout = (page) => <Layout title="Servers | Scrobble.moe">{page}</Layout>

export default Servers
