import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const TopButton = ({ buttonName, routeName }) => {
  return (
    <div>
      <Text fontSize={"3vh"}>
        <ChakraLink
          as={RouterLink}
          to={routeName}
          fontWeight={"bold"}
          color="softGreen"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          {buttonName}
        </ChakraLink>
      </Text>
    </div>
  );
};

TopButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
