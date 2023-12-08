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
    <ChakraLink
      w={"20vw"}
      margin={"0"}
      padding={"0"}
      _hover={{
        textDecoration: "none",
      }}
      onClick={isCurrentPage ? null : () => navigate(routeName)} // 現在のページならonClickをnullに設定
    >
      <Text
        margin={"0"}
        padding={"0.3em"}
        textAlign={"center"}
        fontSize={"1.5em"}
        fontWeight={"bold"}
        _hover={{
          filter: isCurrentPage ? "none" : "brightness(1.25)",
          transition: isCurrentPage ? "none" : "0.3s",
        }}
        cursor={isCurrentPage ? "default" : "pointer"}
        className={isCurrentPage ? "TopButton" : "TopBar"}
      >
        {buttonName}
      </Text>
    </ChakraLink>
  );
};

TopButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
