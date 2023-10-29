import { Box, Text } from "@chakra-ui/react";
import VicugnaModel from "./VicugnaModel";
import { ScrollTargetButton } from "./ScrollTargetButton";

export const VicugnaArea = () => {
  return (
    <>
      <Box width={["100%"]} textAlign={"center"} position={"relative"}>
        <Text
          fontSize={["2em", "2.5em", "3em"]}
          fontWeight={"bold"}
          position={"absolute"}
          top={["2em"]}
          left={["50%"]}
          transform={["translate(-50%, -50%)"]}
          className={"top-title"}
        >
          Hi!
          <br />
          I&apos;am&nbsp;Lamaglama39
        </Text>
        <VicugnaModel></VicugnaModel>
        <ScrollTargetButton
          text={"📜What I can do...📜"}
          target={".skill-title"}
          offsets={"5"}
          styleProps={{
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    </>
  );
};
