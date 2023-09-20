import { Box } from "@chakra-ui/react";
import { TitleText } from "./TitleText";
import { VicugnaModel } from "./VicugnaModel";

export const VicugnaArea = () => {
  return (
    <div>
      <Box
        width={["100vw", "100vw", "75vw"]}
        height={["80vh", "80vh", "100vh"]}
        bg={"lightGreen"}
        marginTop={"5vh"}
      >
        <TitleText
          title={"Lamaglama39"}
          size={["4vh", "4vh", "6vh"]}
        ></TitleText>
        <VicugnaModel></VicugnaModel>
      </Box>
    </div>
  );
};
