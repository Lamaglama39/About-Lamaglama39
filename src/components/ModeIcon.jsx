import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ModeIcon = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const tooltipLabel =
    colorMode === "light" ? "ダークモード?" : "ライトモード?";
  return (
    <Tooltip label={tooltipLabel}>
      <IconButton
        {...props}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};

ModeIcon.propTypes = {
  light: PropTypes.string.isRequired,
};
