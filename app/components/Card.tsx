import { Box } from "@chakra-ui/core"

export function Card({ children, ...props }) {
  return (
    <Box
      p={5}
      shadow="xl"
      borderWidth="1px"
      //   borderColor="rgb(226, 232, 240)"
      flex="1"
      borderRadius="lg"
      {...props}
    >
      {children}
    </Box>
  )
}
