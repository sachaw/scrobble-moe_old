import { Box, Button, Heading, Link, Skeleton, Stack, Text, VStack } from "@chakra-ui/core"
import removeLinkedAccount from "app/accounts/mutations/removeLinkedAccount"
import getUsersAccounts from "app/accounts/queries/getUsersAccounts"
import { Card } from "app/components/Card"
import Layout from "app/layouts/Layout"
import { Link as BlitzLink, BlitzPage, invoke, useQuery } from "blitz"
import { Suspense, useEffect, useState } from "react"
import { FaLayerGroup, FaPen, FaTrash } from "react-icons/fa"

function AccountCards() {
  const [accounts, { refetch }] = useQuery(getUsersAccounts, null, {
    refetchInterval: 5000,
  })
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const handleReceiveMessage = (event) => {
      console.log(event)

      if (event.data.success) {
        setErrorMessage("")
        refetch()
      } else {
        setErrorMessage(JSON.stringify(event.data.error))
      }
    }
    window.addEventListener("message", handleReceiveMessage, false)
  }, [])

  return (
    <VStack spacing={4} align="stretch">
      {errorMessage}
      {accounts?.map((account) => (
        <Card key={account.id} justify>
          <Box userSelect="none">
            <Heading fontSize="xl">{account.service}</Heading>
            <Text mt={4}>{account.userId}</Text>
          </Box>
          <Box my="auto">
            <Link as={BlitzLink} href={`/servers/edit/${account.id}`}>
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
        </Card>
      ))}
      {!accounts.length && (
        <Card>
          <Heading m={"auto"} letterSpacing={"-.1rem"} as="h3" size="lg">
            No Linked Accounts.
          </Heading>
        </Card>
      )}
      <Card>
        <Stack w="full" spacing={4}>
          <Box m={"auto"}>
            <FaLayerGroup size={70} />
          </Box>
          <Link
            w="full"
            textDecoration={"none"}
            href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.ANILIST_CLIENT_ID}&redirect_uri=${process.env.ANILIST_CLIENT_URL}&response_type=code`}
            target="_blank"
          >
            <Button w="full">Link AniList</Button>
          </Link>
        </Stack>
      </Card>
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

AccountsPage.getLayout = (page) => <Layout title="Accounts | Scrobble.moe">{page}</Layout>

export default AccountsPage
