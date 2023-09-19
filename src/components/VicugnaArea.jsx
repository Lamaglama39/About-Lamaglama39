import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { VicugnaModel } from "./VicugnaModel";

export const VicugnaArea = () => {
  return (
    <div>
      <Box width={"100vw"} height={"55vh"} bg={"green.500"} marginTop={"0"}>
        <TitleText title={"Lamaglama39"} size={"4vh"}></TitleText>
        <VicugnaModel></VicugnaModel>
      </Box>
    </div>
  );
};
