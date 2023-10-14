import { Box } from "@chakra-ui/react";
import { InfoText } from "../components/InfoText";
import { InfoCard } from "../components/InfoCard";

export const InfoContents = () => {
  return (
    <Box display={"inline-block"} marginTop={"4em"} marginX={"2em"}>
      <Box display={"inline-block"} className="Pages">
        <InfoText></InfoText>
        <Box
          display={"flex"}
          flexFlow={["row wrap"]}
          justifyContent={["space-evenly"]}
        >
          <InfoCard></InfoCard>
        </Box>
      </Box>
    </Box>
  );
};
