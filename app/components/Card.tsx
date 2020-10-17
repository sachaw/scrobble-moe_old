import { Box, Flex, Img, Spinner } from "@chakra-ui/core"

interface cardProps {
  children: any
  img?: string
}

export function Card({ children, img }: cardProps) {
  return (
    <Box
      userSelect="none"
      p={5}
      shadow="xl"
      flex="1"
      borderRadius="lg"
      backgroundColor={"gray.900"}
    >
      <Flex>
        {img && <Img h={{ base: 32, md: 40 }} m={-5} borderLeftRadius="lg" src={img} />}
        {children}
      </Flex>
    </Box>
  )
}
