import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

export const TitleText = ({ title, size }) => {
  return <Text fontSize={size}>{title}</Text>;
};

TitleText.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
