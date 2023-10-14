import React from "react";
import { TitleText } from "../components/TitleText";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { InfoTopContents } from "../utils/InfoTopContents";

export const InfoText = () => {
  return (
    <Box w="100%">
      <TitleText
        title={InfoTopContents.Name}
        size={["2em", "2em", "2.5em"]}
      ></TitleText>
      <Text fontSize={["1em", "1em", "1.5em"]}>
        {InfoTopContents.Comment.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Text>
    </Box>
  );
};
