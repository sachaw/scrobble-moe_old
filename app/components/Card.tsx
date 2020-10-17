import { Box, Flex, Img, Spinner, useColorMode } from "@chakra-ui/core"

interface cardProps {
  children: any
  img?: string
  justify?: boolean
}

export function Card({ children, img, justify = false }: cardProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      userSelect="none"
      p={5}
      shadow="xl"
      flex="1"
      borderRadius="lg"
      backgroundColor={colorMode === "light" ? "" : "gray.900"}
    >
      <Flex justify={justify ? "space-between" : undefined}>
        {img && <Img h={{ base: 32, md: 40 }} m={-5} borderLeftRadius="lg" src={img} />}
        {children}
      </Flex>
    </Box>
  )
}
