import { Box } from "@chakra-ui/core"

export function Card({ children, ...props }) {
  return (
    <Box
      p={5}
      shadow="lg"
      borderWidth="1px"
      //   borderColor="rgb(226, 232, 240)"
      flex="1"
      borderRadius="md"
      {...props}
    >
      {children}
    </Box>
  )
}
