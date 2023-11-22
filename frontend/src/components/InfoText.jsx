import React from "react";
import { TitleText } from "../components/TitleText";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { InfoTopContents } from "../utils/InfoTopContents";

export const InfoText = () => {
  return (
    <Box
      w="100%"
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      marginTop={["5em"]}
    >
      <TitleText title={InfoTopContents.Name} size={["2.5em"]}></TitleText>
      <Text fontSize={["1.5em"]}>
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
