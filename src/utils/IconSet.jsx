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

export const IconSet = {
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
