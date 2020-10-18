import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Progress,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  UnorderedList,
  VStack,
  useColorMode,
} from "@chakra-ui/core"
import { ScrobbleInstance, ScrobbleItem } from "@prisma/client"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import getScrobbleStats from "app/scrobbles/queries/getScrobbleStats"
import getUsersScrobbles from "app/scrobbles/queries/getUsersScrobbles"
import { Link as BlitzLink, BlitzPage, useQuery } from "blitz"
import { GraphQLClient, gql } from "graphql-request"
import { Suspense, useEffect, useState } from "react"
import {
  FaAngleDoubleRight,
  FaCaretDown,
  FaCaretUp,
  FaCheck,
  FaCross,
  FaEllipsisH,
  FaExternalLinkAlt,
  FaSync,
} from "react-icons/fa"
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
  const { colorMode, toggleColorMode } = useColorMode()
  const toggleShowAttempt = () => setShowAttempt(!showAttempt)

  useEffect(() => {
    setAnilistData(filterAnilistData(parseInt(scrobble.providerMediaId), data)[0])
  }, [data])

  return anilistData ? (
    <Card img={anilistData.coverImage.extraLarge}>
      <Box overflow={"hidden"} ml={8} w="full">
        <Flex justify="space-between" h="30%">
          <Text>EPISODE {scrobble.episode}</Text>
          <Box w="30%">
            <Progress
              colorScheme="blue"
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
        <Flex justify="space-between" h="30%">
          <Heading
            fontSize={{ base: "md", md: "xl" }}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
          >
            {anilistData.title.romaji}
          </Heading>
        </Flex>
        <Box float="right" h="40%">
          <Link
            mr={2}
            target="_blank"
            href={`https://anilist.co/anime/${scrobble.providerMediaId}`}
          >
            <Button>
              <FaExternalLinkAlt />
            </Button>
          </Link>
          <Button m="auto" onClick={toggleShowAttempt}>
            {showAttempt ? <FaCaretUp /> : <FaCaretDown />}
          </Button>
        </Box>
      </Box>
    </Card>
  ) : (
    <Card>
      <Box m={-5} h={{ base: 32, md: 40 }}>
        <Flex
          borderLeftRadius="lg"
          h="full"
          w={{ base: 24, md: 32 }}
          backgroundColor={colorMode === "light" ? "" : "gray.700"}
        >
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
  const [scrobbles, { fetchMore }] = useQuery(getUsersScrobbles, {
    include: {
      attempts: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 7,
  })
  const [scrobbleStats, { refetch }] = useQuery(getScrobbleStats, null)
  const [anilistData, setAnilistData] = useState([] as any[])
  const [timeUpdated, setTimeUpdated] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

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
        setTimeUpdated(new Date())
        setIsLoading(false)
      })
  }, [scrobbles])

  return (
    <SimpleGrid minChildWidth="320px" spacing={4}>
      <VStack spacing={4} align="stretch">
        <Card justify>
          <Heading as="h3" size="lg">
            Recent Scrobbles
          </Heading>
          <Link as={BlitzLink} href="/scrobbles/">
            <Button my="auto">
              View All&nbsp;
              <FaAngleDoubleRight size="16" />
            </Button>
          </Link>
        </Card>
        {scrobbles?.map((scrobble) => (
          <Scrobble
            key={scrobble.id}
            data={anilistData}
            scrobble={
              scrobble as ScrobbleItem & {
                attempts: ScrobbleInstance[]
              }
            }
          />
        ))}
        {!scrobbles.length && (
          <Card>
            <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
              No Scrobbles.
            </Heading>
          </Card>
        )}
      </VStack>
      <VStack spacing={4} height="fit-content" align="stretch">
        <Card flexDir="column">
          <Heading>Stats</Heading>
          <Divider my={4} />
          <StatGroup>
            <Stat>
              <StatLabel>Scrobbles this week</StatLabel>
              <StatNumber>{scrobbleStats.weekly}</StatNumber>
            </Stat>
          </StatGroup>
          <Flex mt={4} justify="space-between">
            <Button
              isLoading={isLoading}
              loadingText="Refreshing"
              onClick={() => {
                setIsLoading(true)
                fetchMore()
                refetch()
              }}
              w="35%"
            >
              <FaSync />
            </Button>
            <Text m="auto">
              Updated <small>{timeUpdated.toISOString().slice(0, -5) + "Z"}</small>
            </Text>
          </Flex>
        </Card>
      </VStack>
    </SimpleGrid>
  )
}

const Dashboard: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton height={8} />}>
      <ScrobbleCards />
    </Suspense>
  )
}

Dashboard.getLayout = (page) => <Layout title="Dashboard | Scrobble.moe">{page}</Layout>

export default Dashboard
