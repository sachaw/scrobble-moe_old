import { Box, Button, Flex, Heading, Link, Skeleton, Stack, Text, VStack } from "@chakra-ui/core"
import { ScrobbleInstance, ScrobbleItem } from "@prisma/client"
import Layout from "app/layouts/Layout"
import getUsersScrobbles from "app/scrobbles/queries/getUsersScrobbles"
import removeServer from "app/servers/mutations/removeServer"
import { Link as BlitzLink, BlitzPage, invoke, useQuery } from "blitz"
import { Suspense, useState } from "react"
import { FaCaretDown, FaCaretUp, FaCheck, FaSync } from "react-icons/fa"
import { FaLayerGroup } from "react-icons/fa"

const Card = (
  scrobble: ScrobbleItem & {
    attempts: ScrobbleInstance[]
  }
) => {
  const [showAttempt, setShowAttempt] = useState(false)
  const toggleShowAttempt = () => setShowAttempt(!showAttempt)

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Flex justify="space-between">
        <Box userSelect="none">
          <Heading fontSize="xl">{scrobble.providerMediaId}</Heading>
          <Text mt={4}>{scrobble.episode}</Text>
        </Box>
        <Box my="auto">
          <Button mr={2} variant="ghost" onClick={toggleShowAttempt}>
            {showAttempt ? <FaCaretUp /> : <FaCaretDown />}
          </Button>
          {scrobble.attempts[0].status === "SUCCESS" ? (
            <Button variant="ghost" disabled>
              <FaCheck />
            </Button>
          ) : (
            <Button variant="ghost">
              <FaSync />
            </Button>
          )}
        </Box>
      </Flex>
      {showAttempt && <p>test</p>}
    </Box>
  )
}

function ScrobbleCards() {
  const [scrobbles, { refetch }] = useQuery(getUsersScrobbles, null)

  return (
    <VStack spacing={4} align="stretch">
      {scrobbles?.map((scrobble) => (
        <Card key={scrobble.id} {...scrobble} />
      ))}
      {!scrobbles.length && (
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

const Dashboard: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton height="20px" />}>
      <ScrobbleCards />
    </Suspense>
  )
}

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard
