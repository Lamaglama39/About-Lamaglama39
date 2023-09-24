import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { IconSet } from "../utils/IconSet";

export const Icons = ({ title }) => {
  const selectedIcons = IconSet[title];

  return (
    <Box>
      <IconContext.Provider value={{ size: "4vh" }}>
        {selectedIcons.map((icon, index) => (
          <Box
            key={index}
            display="inline-block"
            margin={"1vw"}
            mr={index === selectedIcons.length - 1 ? "0" : "2"}
          >
            {icon}
          </Box>
        ))}
      </IconContext.Provider>
    </Box>
  );
};

Icons.propTypes = {
  title: PropTypes.string.isRequired,
};
