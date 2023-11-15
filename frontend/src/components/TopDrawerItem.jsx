import { Link as ChakraLink } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";
import { useLocation } from "react-router-dom";

export const TopDrawerItem = ({ buttonName, routeName }) => {
  const { navigate } = useContext(NavigationContext);
  const location = useLocation(); // 現在のlocationを取得

  const isCurrentPage = location.pathname === routeName; // 現在のページがこのボタンのルートと一致しているかどうかをチェック

  return (
    <ChakraLink
      _hover={{
        textDecoration: "none",
      }}
      onClick={isCurrentPage ? null : () => navigate(routeName)} // 現在のページならonClickをnullに設定
    >
      <Text
        marginY={"0.25em"}
        textAlign={"center"}
        fontSize={"1.5em"}
        fontWeight={"bold"}
        _hover={{
          filter: isCurrentPage ? "none" : "brightness(1.50)",
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
