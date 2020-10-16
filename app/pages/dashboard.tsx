import { Box, Button, Flex, Heading, Skeleton, Text, VStack } from "@chakra-ui/core"
import { ScrobbleInstance, ScrobbleItem } from "@prisma/client"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import getUsersScrobbles from "app/scrobbles/queries/getUsersScrobbles"
import { BlitzPage, useQuery } from "blitz"
import { Suspense, useState } from "react"
import { FaCaretDown, FaCaretUp, FaCheck, FaSync } from "react-icons/fa"

const Scrobble = (
  scrobble: ScrobbleItem & {
    attempts: ScrobbleInstance[]
  }
) => {
  const [showAttempt, setShowAttempt] = useState(false)
  const toggleShowAttempt = () => setShowAttempt(!showAttempt)

  return (
    <Card>
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
    </Card>
  )
}

function ScrobbleCards() {
  const [scrobbles] = useQuery(getUsersScrobbles, null)

  return (
    <VStack spacing={4} align="stretch">
      {scrobbles?.map((scrobble) => (
        <Scrobble key={scrobble.id} {...scrobble} />
      ))}
      {!scrobbles.length && (
        <Card>
          <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
            No Scrobbles.
          </Heading>
        </Card>
      )}
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
