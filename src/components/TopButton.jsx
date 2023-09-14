import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const TopButton = ({ buttonName, routeName }) => {
  return (
    <div>
      <Text fontSize={"3vh"} colorScheme="green">
        <Link to={routeName}>{buttonName}</Link>
      </Text>
    </div>
  );
};

TopButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
