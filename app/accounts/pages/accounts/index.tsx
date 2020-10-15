import { Box, Button, Flex, Heading, Link, Skeleton, Stack, Text, VStack } from "@chakra-ui/core"
import removeLinkedAccount from "app/accounts/mutations/removeLinkedAccount"
import getUsersAccounts from "app/accounts/queries/getUsersAccounts"
import Layout from "app/layouts/Layout"
import { Link as BlitzLink, BlitzPage, invoke, useQuery } from "blitz"
import { Suspense } from "react"
import { FaLayerGroup, FaPen, FaTrash } from "react-icons/fa"

function AccountCards() {
  const [accounts, { refetch }] = useQuery(getUsersAccounts, null)
  console.log(process.env.ANILIST_CLIENT_URL)

  return (
    <VStack spacing={4} align="stretch">
      {accounts?.map((account) => (
        <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
          <Flex justify="space-between">
            <Box userSelect="none">
              <Heading fontSize="xl">{account.service}</Heading>
              <Text mt={4}>{account.userId}</Text>
            </Box>
            <Box my="auto">
              <Link as={BlitzLink} href={"/servers/edit/" + account.id}>
                <Button mr={2} variant="ghost">
                  <FaPen />
                </Button>
              </Link>
              <Button
                onClick={async () => {
                  await invoke(removeLinkedAccount, {
                    id: account.id,
                  })
                  refetch()
                }}
                variant="ghost"
              >
                <FaTrash />
              </Button>
            </Box>
          </Flex>
        </Box>
      ))}
      {!accounts.length && (
        <Box userSelect={"none"} p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
          <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
            No Linked Accounts.
          </Heading>
        </Box>
      )}
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Stack spacing={4}>
          <Box m={"auto"}>
            <FaLayerGroup size={70} />
          </Box>
          <Link
            textDecoration={"none"}
            w="100%"
            href={
              "https://anilist.co/api/v2/oauth/authorize?client_id=" +
              process.env.ANILIST_CLIENT_ID +
              "&redirect_uri=" +
              process.env.ANILIST_CLIENT_URL +
              "&response_type=code"
            }
            target="_blank"
          >
            <Button variant="ghost">Link AniList</Button>
          </Link>
        </Stack>
      </Box>
    </VStack>
  )
}

const AccountsPage: BlitzPage = () => {
  return (
    <Suspense fallback={<Skeleton height="20px" />}>
      <AccountCards />
    </Suspense>
  )
}

AccountsPage.getLayout = (page) => <Layout title="Accounts">{page}</Layout>

export default AccountsPage
