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
          margin={["1em", "1em", "1.5em"]}
        >
          <Link
            href={iconData.url}
            isExternal
            display="inline-flex"
            flexDirection="column"
            alignItems="center"
            h={["3em", "3.5em", "4em"]}
            w={["3em", "3.5em", "4em"]}
            _hover={{
              textDecoration: "none",
              filter: "brightness(1.5)",
              transition: "0.3s",
            }}
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
