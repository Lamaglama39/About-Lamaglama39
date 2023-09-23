import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";

import { NavigationContext } from "./NavigationContext";

export const TopButton = ({ buttonName, routeName }) => {
  const { navigate } = useContext(NavigationContext);

  return (
    <div>
      <Text fontSize={"3vh"}>
        <ChakraLink
          onClick={() => navigate(routeName)}
          fontWeight={"bold"}
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
