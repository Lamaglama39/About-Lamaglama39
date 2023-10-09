import React from "react";
import { TitleText } from "../components/TitleText";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ProfileTopContents } from "../utils/ProfileTopContents";

export const ProfileText = () => {
  return (
    <Box w="100%">
      <TitleText
        title={ProfileTopContents.Name}
        size={["24px", "32px", "40px"]}
      ></TitleText>
      <Text fontSize={["16px", "16px", "24px"]}>
        {ProfileTopContents.Comment.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Text>
    </Box>
  );
};
