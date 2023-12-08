import { Box } from "@chakra-ui/react";
import { TopButton } from "../components/TopButton";
import PropTypes from "prop-types";

export const TopButtonList = ({ onNavigate, display }) => {
  const buttonNameList = [
    ["Top", "/"],
    ["Profile", "/profile"],
    ["Apps", "/apps"],
    ["Articles", "/article"],
    ["Info", "/info"],
  ];

  return (
    <Box
      display={display}
      w={"100vw"}
      alignItems={"center"}
      textAlign={"center"}
    >
      {buttonNameList.map((buttonName) => {
        return (
          <TopButton
            key={buttonName[0]}
            buttonName={buttonName[0]}
            routeName={buttonName[1]}
            onNavigate={onNavigate}
          />
        );
      })}
    </Box>
  );
};

TopButtonList.propTypes = {
  onNavigate: PropTypes.string,
  display: PropTypes.string,
};
