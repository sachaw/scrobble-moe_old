import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Progress,
  Skeleton,
  Spinner,
  Stack,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/core"
import { ScrobbleInstance, ScrobbleItem } from "@prisma/client"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import getUsersScrobbles from "app/scrobbles/queries/getUsersScrobbles"
import { BlitzPage, useQuery } from "blitz"
import { GraphQLClient, gql } from "graphql-request"
import { Suspense, useEffect, useState } from "react"
import { FaCaretDown, FaCaretUp, FaCheck, FaCross, FaExternalLinkAlt, FaSync } from "react-icons/fa"
import { format } from "timeago.js"

const graphQLClient = new GraphQLClient("https://graphql.anilist.co/")

interface props {
  scrobble: ScrobbleItem & {
    attempts: ScrobbleInstance[]
  }
  data: any[]
}

const filterAnilistData = (id: number, anilistData: any[]) => {
  return anilistData.length && (anilistData.filter((entry) => entry.id === id) as any)
}

const Scrobble = ({ scrobble, data }: props) => {
  const [showAttempt, setShowAttempt] = useState(false)
  const [anilistData, setAnilistData] = useState(null as null | any)
  const toggleShowAttempt = () => setShowAttempt(!showAttempt)

  useEffect(() => {
    setAnilistData(filterAnilistData(parseInt(scrobble.providerMediaId), data)[0])
  }, [data])

  return anilistData ? (
    <Card img={anilistData.coverImage.extraLarge}>
      <Box overflow={"hidden"} ml={8} w="full">
        <Flex justify="space-between" h="33%">
          <Text>EPISODE {scrobble.episode}</Text>
          <Box w={{ base: "50%", md: "15%" }}>
            <Progress
              colorScheme="green"
              size="sm"
              value={
                anilistData.episodes
                  ? (scrobble.episode / anilistData.episodes) * 100
                  : scrobble.episode < 13
                  ? (scrobble.episode / 12) * 100
                  : scrobble.episode < 25
                  ? (scrobble.episode / 12) * 100
                  : scrobble.episode < 53
                  ? (scrobble.episode / 52) * 100
                  : 0
              }
            />
            <Text float="right" overflow={"hidden"} whiteSpace={"nowrap"}>
              {format(scrobble.createdAt)}
            </Text>
          </Box>
        </Flex>
        <Flex justify="space-between" h="33%">
          <Heading
            fontSize={{ base: "md", md: "xl" }}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {anilistData.title.romaji}
          </Heading>
        </Flex>
        <Box float="right" h="33%">
          <Button variant="ghost">
            <FaExternalLinkAlt />
          </Button>
          <Button m="auto" mr={2} variant="ghost" onClick={toggleShowAttempt}>
            {showAttempt ? <FaCaretUp /> : <FaCaretDown />}
          </Button>
        </Box>
      </Box>
      {/* <Box overflow={"hidden"} ml={8}>
        <Heading fontSize="md" overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"}>
          {anilistData.title.romaji}
        </Heading>
        <Text mt={4}>{scrobble.episode}</Text>
      </Box>
      <Box float="right" my="auto">
        <Button mr={2} variant="ghost" onClick={toggleShowAttempt}>
          {showAttempt ? <FaCaretUp /> : <FaCaretDown />}
        </Button>
      </Box> */}
    </Card>
  ) : (
    <Card>
      <Box m={-5} h={{ base: 32, md: 40 }}>
        <Flex borderLeftRadius="lg" h="full" w={{ base: 24, md: 32 }} backgroundColor={"gray.700"}>
          <Spinner m={"auto"} size="xl" />
        </Flex>
      </Box>
      <Stack ml={8} w="full">
        <Skeleton height={{ base: 4, md: 8 }} />
        <Skeleton height={{ base: 16, md: 20 }} />
      </Stack>
    </Card>
  )
}

function ScrobbleCards() {
  const [scrobbles] = useQuery(getUsersScrobbles, null)
  const [anilistData, setAnilistData] = useState([] as any[])

  const ANILIST_MEDIA_QUERY = gql`
    query Page($id_in: [Int]!) {
      Page {
        media(id_in: $id_in) {
          id
          title {
            romaji
          }
          coverImage {
            extraLarge
          }
          episodes
        }
      }
    }
  `

  useEffect(() => {
    graphQLClient
      .request(ANILIST_MEDIA_QUERY, {
        id_in: scrobbles.map((scrobble) => scrobble.providerMediaId),
      })
      .then((data) => {
        setAnilistData(data.Page.media)
      })
  }, [scrobbles])

  return (
    <VStack spacing={4} align="stretch">
      {scrobbles?.map((scrobble) => (
        <Scrobble key={scrobble.id} data={anilistData} scrobble={scrobble} />
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
    <Suspense fallback={<Skeleton height={8} />}>
      <ScrobbleCards />
    </Suspense>
  )
}

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard
