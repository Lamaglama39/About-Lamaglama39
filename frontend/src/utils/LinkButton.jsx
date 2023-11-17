import { Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { NavigationContext } from "../components/NavigationContext";
import PropTypes from "prop-types";

export const LinkButton = ({ text, target, styleProps }) => {
  const { navigate } = useContext(NavigationContext);
  const handleClick = () => {
    navigate(target);
  };

  return (
    <ChakraLink
      onClick={handleClick}
      textDecoration="none"
      style={{ ...styleProps }}
      _hover={{
        textDecoration: "none",
        filter: "brightness(1.5)",
        transition: "0.3s",
      }}
      cursor={"pointer"}
      borderRadius={"0.5em"}
      className="selectButton"
      textAlign={"center"}
    >
      <Text margin={"0"} paddingX={"0.5em"} fontSize={"2em"}>
        {text}
      </Text>
    </ChakraLink>
  );
};

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  styleProps: PropTypes.object.isRequired,
};
