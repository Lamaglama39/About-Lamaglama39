import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { IconSet } from "../utils/IconSet";
import { Link } from "@chakra-ui/react";

export const SkillIcon = ({ title }) => {
  const selectedIcons = IconSet[title];

  return (
    <Box>
      {selectedIcons.map((iconData, index) => (
        <Box
          key={index}
          display="inline-block"
          margin={["8px", "12px", "16px"]}
        >
          <Link
            href={iconData.url}
            isExternal
            display="inline-block"
            textAlign={"center"}
            h={["6vh", "7vh", "8vh"]}
            w={["6vh", "7vh", "8vh"]}
          >
            {iconData.icon}
            {iconData.name}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

SkillIcon.propTypes = {
  title: PropTypes.string.isRequired,
};
