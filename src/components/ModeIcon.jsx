import PropTypes from "prop-types";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ModeIcon = ({ light }) => {
  return (
    <>
      <div>
        {light ? <SunIcon w="3vh" h="3vh" /> : <MoonIcon w="3vh" h="3vh" />}
      </div>
    </>
  );
};

ModeIcon.propTypes = {
  light: PropTypes.string.isRequired,
};
