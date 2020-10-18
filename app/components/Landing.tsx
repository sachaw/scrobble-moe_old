import { Box, Button, Flex, Heading, Image, Link, Stack, Text } from "@chakra-ui/core"
import { Link as BlitzLink } from "blitz"
import React from "react"
import { FaMagic } from "react-icons/fa"

export default function Landing() {
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      wrap="nowrap"
      minH="70vh"
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Automatically track all your anime on Plex
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          With automatic scrobbling, keep your AniList in sync all the time, never manually update
          your list again!
        </Heading>

        <Link as={BlitzLink} href="/register">
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            Create your account now&nbsp;&nbsp;
            <FaMagic />
          </Button>
        </Link>
        <Text fontSize="xs" mt={2} textAlign="center" opacity="0.6">
          Must be using the AniList metadata provider found&nbsp;
          <Link target="_blank" color="blue.300" href="https://github.com/sachaw/anilist.bundle">
            Here
          </Link>
        </Text>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src="https://source.unsplash.com/collection/53092760/800x600"
          rounded="1rem"
          shadow="2xl"
        />
      </Box>
    </Flex>
  )
}
