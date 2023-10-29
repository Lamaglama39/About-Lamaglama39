import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { NavigationContext } from "./NavigationContext";

export const TopButton = ({ buttonName, routeName }) => {
  const { navigate } = useContext(NavigationContext);
  const location = useLocation(); // 現在のlocationを取得

  const isCurrentPage = location.pathname === routeName; // 現在のページがこのボタンのルートと一致しているかどうかをチェック

  return (
    <Text
      fontSize={["2em"]}
      w={"33%"}
      className={isCurrentPage ? "TopButton" : "none"}
      textAlign={"center"}
    >
      <ChakraLink
        onClick={isCurrentPage ? null : () => navigate(routeName)} // 現在のページならonClickをnullに設定
        fontWeight={"bold"}
        textDecoration="none"
        _hover={{ textDecoration: isCurrentPage ? "none" : "underline" }}
        cursor={isCurrentPage ? "default" : "pointer"}
      >
        {buttonName}
      </ChakraLink>
    </Text>
  );
};

TopButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
