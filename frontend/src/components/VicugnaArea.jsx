import { Box, Text } from "@chakra-ui/react";
import VicugnaModel from "./VicugnaModel";

export const VicugnaArea = () => {
  return (
    <>
      <Box width={["100%"]} textAlign={"center"} position={"relative"}>
        <Text
          fontSize={["2em", "2.5em", "3em"]}
          fontWeight={"bold"}
          position={"absolute"}
          top={["4em", "4em", "2em"]}
          left={["50%"]}
          transform={["translate(-50%, -50%)"]}
          className={"top-title"}
        >
          Welcome to Lamaglama39 portfolio.
        </Text>
        <VicugnaModel></VicugnaModel>
      </Box>
    </>
  );
};
