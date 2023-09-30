import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { VicugnaModel } from "./VicugnaModel";

export const VicugnaArea = () => {
  return (
    <>
      <Box
        marginTop={["5vh"]}
        width={["100%", "100%", "70%"]}
        textAlign={"center"}
      >
        <TitleText
          title={"Lamaglama39"}
          size={["24px", "32px", "40px"]}
        ></TitleText>
        <VicugnaModel></VicugnaModel>
      </Box>
    </>
  );
};
