import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { VicugnaModel } from "./VicugnaModel";

export const VicugnaArea = () => {
  return (
    <div>
      <Box height={"5vh"}></Box>
      <Box width={["100vw", "100vw", "70vw"]} height={["50vh", "50vh", "95vh"]}>
        <TitleText
          title={"Lamaglama39"}
          size={["4vh", "4vh", "6vh"]}
        ></TitleText>
        <VicugnaModel></VicugnaModel>
      </Box>
    </div>
  );
};
