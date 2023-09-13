import { Box } from "@chakra-ui/react";

export default function Sample() {
  return (
    <div>
      <Box m={10} maxW="960px" mx="auto" bg={"tomato"}>
        Tomato
      </Box>
      <Box maxW="960px" mx="auto" />
      <Box m={[2, 3]} />
    </div>
  );
}
