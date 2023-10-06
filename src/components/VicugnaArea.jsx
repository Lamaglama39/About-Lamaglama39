import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import VicugnaModel from "./VicugnaModel";
import { ScrollBottomButton } from "../components/ScrollBottomButton";

export const VicugnaArea = () => {
  // Check the current viewport width.
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)"); // Adjust the value as per your requirement.

  return (
    <>
      <Box
        width={["100%", "100%", "75%"]}
        textAlign={"center"}
        position={"relative"}
      >
        <Text
          fontSize={["32px", "40px", "48px"]}
          fontWeight={"bold"}
          position={"absolute"}
          top={["8vh"]}
          left={["50%"]}
          transform={["translate(-50%, -50%)"]}
        >
          I&apos;am <br /> Lamaglama39...
        </Text>
        <VicugnaModel></VicugnaModel>
        {/* Display ScrollBottomButton only when the viewport width is less than the md breakpoint */}
        {!isLargerThanMD && <ScrollBottomButton text={"🦙What Skills?🦙"} />}
      </Box>
    </>
  );
};
