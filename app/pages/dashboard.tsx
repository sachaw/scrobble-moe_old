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
import { FaCaretDown, FaCaretUp, FaCheck, FaCross, FaSync } from "react-icons/fa"

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

function truncate(text, max) {
  return text.substr(0, max - 1) + (text.length > max ? "…" : "")
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
        <Flex justify="space-between" h="full">
          <Heading
            fontSize={{ base: "md", md: "xl" }}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {anilistData.title.romaji}
          </Heading>
          <Button m="auto" mr={2} variant="ghost" onClick={toggleShowAttempt}>
            {showAttempt ? <FaCaretUp /> : <FaCaretDown />}
          </Button>
        </Flex>
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
  }, [])

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
