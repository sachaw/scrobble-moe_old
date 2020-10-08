import {
  Box,
  Button,
  Flex,
  Heading,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/core"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import { FaPen, FaTrash } from "react-icons/fa"

function Scrobble({ title, desc, ...rest }) {
  return (
    <Box width="100%" p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" {...rest}>
      <Flex justify="space-between">
        <Box userSelect="none">
          <Heading fontSize="xl">{title}</Heading>
          <Text mt={4}>{desc}</Text>
        </Box>
        <Box my="auto">
          <Button mr={2} variant="ghost">
            <FaPen />
          </Button>
          <Button variant="ghost">
            <FaTrash />
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

const Dashboard: BlitzPage = () => {
  return (
    <Flex flexDirection="row-reverse" justify="space-between" wrap="wrap">
      <VStack width={{ base: "full", md: "auto" }} spacing={4}>
        <Stat>
          <StatLabel>Some Stat</StatLabel>
          <StatNumber>23</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
      </VStack>

      <VStack width={{ base: "full", md: "auto" }} spacing={4}>
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
        <Scrobble title="Some Show" desc="epsiode 4" />
      </VStack>
    </Flex>
  )
}

Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard
