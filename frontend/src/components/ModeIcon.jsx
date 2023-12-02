import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ModeIcon = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      w={"2em"}
      border={"none"}
      bg={"none"}
      position={"fixed"}
      top={["0em", "0", "4em"]}
      marginY={["0.25em"]}
      right={["0.25em", "0.25em", "1em"]}
    >
      {colorMode === "light" ? (
        <MoonIcon fontSize={"2em"} />
      ) : (
        <SunIcon fontSize={"2em"} />
      )}
    </Button>
  );
};
