import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

export const TitleText = ({ title, size }) => {
  return (
    <Text fontWeight={"bold"} fontSize={size} padding={"1vh"} margin={"0"}>
      {title}
    </Text>
  );
};

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
