import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ModeIcon = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} w={"1%"} border={"none"} bg={"none"}>
      {colorMode === "light" ? (
        <MoonIcon fontSize={"3vh"} />
      ) : (
        <SunIcon fontSize={"3vh"} />
      )}
    </Button>
  );
};
