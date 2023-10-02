import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiBlender,
  SiThreedotjs,
  SiNodedotjs,
  SiDeno,
  SiFlask,
  SiAmazonaws,
  SiDocker,
  SiTerraform,
  SiFirebase,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";

import { Icon } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

const fontStyle = {
  margin: "0",
  fontSize: ["16px"],
  fontWeight: ["bold"],
};
const iconStyle = { w: ["4vh", "5vh", "6vh"], h: ["4vh", "5vh", "6vh"] };
const iconColor = {
  Javascript: "yellow.400",
  TypeScript: "blue.500",
  Python: "cyan.700",
  // Bash: "black",
  React: "cyan.400",
  // NextJs: "black",
  Blender: "orange.400",
  ThreeJs: "green.300",
  NodeJs: "green.600",
  // Deno: "black",
  // Flask: "black",
  MySQL: "blue.600",
  AWS: "orange.300",
  Firebase: "orange.500",
  Docker: "blue.500",
  Terraform: "purple.500",
};

export const IconSet = {
  Languages: [
    {
      icon: (
        <Icon as={SiJavascript} color={iconColor.Javascript} {...iconStyle} />
      ),
      name: (
        <Text color={iconColor.Javascript} {...fontStyle}>
          JavaScript
        </Text>
      ),
      url: "https://www.javascript.com/",
    },
    {
      icon: (
        <Icon as={SiTypescript} color={iconColor.TypeScript} {...iconStyle} />
      ),
      name: (
        <Text color={iconColor.TypeScript} {...fontStyle}>
          TypeScript
        </Text>
      ),
      url: "https://www.typescriptlang.org/",
    },
    {
      icon: <Icon as={SiPython} color={iconColor.Python} {...iconStyle} />,
      name: (
        <Text color={iconColor.Python} {...fontStyle}>
          Python
        </Text>
      ),
      url: "https://www.python.org/",
    },
    {
      icon: <Icon as={SiGnubash} color={iconColor.Bash} {...iconStyle} />,
      name: (
        <Text color={iconColor.Bash} {...fontStyle}>
          Bash
        </Text>
      ),
      url: "https://www.gnu.org/software/bash/",
    },
  ],
  Frontend: [
    {
      icon: <Icon as={SiReact} color={iconColor.React} {...iconStyle} />,
      name: (
        <Text color={iconColor.React} {...fontStyle}>
          React
        </Text>
      ),
      url: "https://reactjs.org/",
    },
    {
      icon: <Icon as={SiNextdotjs} color={iconColor.NextJs} {...iconStyle} />,
      name: (
        <Text color={iconColor.NextJs} {...fontStyle}>
          Next.js
        </Text>
      ),
      url: "https://nextjs.org/",
    },
    {
      icon: <Icon as={SiBlender} color={iconColor.Blender} {...iconStyle} />,
      name: (
        <Text color={iconColor.Blender} {...fontStyle}>
          Blender
        </Text>
      ),
      url: "https://www.blender.org/",
    },
    {
      icon: <Icon as={SiThreedotjs} color={iconColor.ThreeJs} {...iconStyle} />,
      name: (
        <Text color={iconColor.ThreeJs} {...fontStyle}>
          Three.js
        </Text>
      ),
      url: "https://threejs.org/",
    },
  ],
  Backend: [
    {
      icon: <Icon as={SiNodedotjs} color={iconColor.NodeJs} {...iconStyle} />,
      name: (
        <Text color={iconColor.NodeJs} {...fontStyle}>
          Node.js
        </Text>
      ),
      url: "https://nodejs.org/",
    },
    {
      icon: <Icon as={SiDeno} color={iconColor.Deno} {...iconStyle} />,
      name: (
        <Text color={iconColor.Deno} {...fontStyle}>
          Deno
        </Text>
      ),
      url: "https://deno.land/",
    },
    {
      icon: <Icon as={SiFlask} color={iconColor.Flask} {...iconStyle} />,
      name: (
        <Text color={iconColor.Flask} {...fontStyle}>
          Flask
        </Text>
      ),
      url: "https://palletsprojects.com/p/flask/",
    },
    {
      icon: <Icon as={GrMysql} color={iconColor.MySQL} {...iconStyle} />,
      name: (
        <Text color={iconColor.MySQL} {...fontStyle}>
          MySQL
        </Text>
      ),
      url: "https://www.mysql.com/",
    },
  ],
  Infrastructure: [
    {
      icon: <Icon as={SiAmazonaws} color={iconColor.AWS} {...iconStyle} />,
      name: (
        <Text color={iconColor.AWS} {...fontStyle}>
          AWS
        </Text>
      ),
      url: "https://aws.amazon.com/",
    },
    {
      icon: <Icon as={SiFirebase} color={iconColor.Firebase} {...iconStyle} />,
      name: (
        <Text color={iconColor.Firebase} {...fontStyle}>
          Firebase
        </Text>
      ),
      url: "https://firebase.com/",
    },
    {
      icon: <Icon as={SiDocker} color={iconColor.Docker} {...iconStyle} />,
      name: (
        <Text color={iconColor.Docker} {...fontStyle}>
          Docker
        </Text>
      ),
      url: "https://www.docker.com/",
    },
    {
      icon: (
        <Icon as={SiTerraform} color={iconColor.Terraform} {...iconStyle} />
      ),
      name: (
        <Text color={iconColor.Terraform} {...fontStyle}>
          Terraform
        </Text>
      ),
      url: "https://www.terraform.io/",
    },
  ],
};
