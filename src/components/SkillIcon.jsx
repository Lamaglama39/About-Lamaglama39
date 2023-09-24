import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { IconContext } from "react-icons"; //IconContextをインポート

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiBlender,
  SiNodedotjs,
  SiDeno,
  SiFlask,
  SiMysql,
  SiAmazonaws,
  SiVercel,
  SiDocker,
  SiTerraform,
} from "react-icons/si";

import { TbBrandThreejs } from "react-icons/tb";

const iconSets = {
  Languages: [
    <SiJavascript key="SiJavascript" />,
    <SiTypescript key="SiTypescript" />,
    <SiPython key="SiPython" />,
    <SiGnubash key="SiGnubash" />,
  ],
  Frontend: [
    <SiReact key="SiReact" />,
    <SiNextdotjs key="SiNextdotjs" />,
    <SiBlender key="SiBlender" />,
    <TbBrandThreejs key="TbBrandThreejs" />,
  ],
  Backend: [
    <SiNodedotjs key="SiNodedotjs" />,
    <SiDeno key="SiDeno" />,
    <SiFlask key="SiFlask" />,
    <SiMysql key="SiMysql" />,
  ],
  Infrastructure: [
    <SiAmazonaws key="SiAmazonaws" />,
    <SiVercel key="SiVercel" />,
    <SiDocker key="SiDocker" />,
    <SiTerraform key="SiTerraform" />,
  ],
};

export const Icons = ({ title }) => {
  const selectedIcons = iconSets[title]; // titleに基づいて適切なアイコンの配列を選択

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
