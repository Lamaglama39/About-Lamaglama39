import { Box } from "@chakra-ui/react";
import { InfoText } from "../components/InfoText";
import { InfoCard } from "../components/InfoCard";

export const InfoContents = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w={"100%"}
    >
      <Box className="Pages">
        <InfoText></InfoText>
        <Box display="flex" flexFlow="row wrap" justifyContent="space-evenly">
          <InfoCard></InfoCard>
        </Box>
      </Box>
    </Box>
  );
};
