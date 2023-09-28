import { chakra } from "@chakra-ui/react";

import JavaScript from "../assets/svg/javascript.svg?react";
import TypeScript from "../assets/svg/typescript-icon.svg?react";
import Python from "../assets/svg/python.svg?react";
import Bash from "../assets/svg/bash-icon.svg?react";

import React from "../assets/svg/react.svg?react";
import NextJs from "../assets/svg/nextjs-icon.svg?react";
import Blender from "../assets/svg/blender.svg?react";
import ThreeJs from "../assets/svg/threejs.svg?react";

import Node from "../assets/svg/nodejs-icon.svg?react";
import Deno from "../assets/svg/deno.svg?react";
import Flask from "../assets/svg/flask.svg?react";
import MySQL from "../assets/svg/mysql.svg?react";

import Aws from "../assets/svg/aws.svg?react";
import Vercel from "../assets/svg/vercel-icon.svg?react";
import Docker from "../assets/svg/docker-icon.svg?react";
import Terraform from "../assets/svg/terraform-icon.svg?react";

const ICONS = {
  JavaScript,
  TypeScript,
  Python,
  Bash,
  React,
  NextJs,
  Blender,
  ThreeJs,
  Node,
  Deno,
  Flask,
  MySQL,
  Aws,
  Vercel,
  Docker,
  Terraform,
};

// SVGファイルをChakuraで変換
const ChakraIcons = Object.fromEntries(
  Object.entries(ICONS).map(([key, Icon]) => [key, chakra(Icon)])
);

// SVGレンダリング用関数
const renderIcon = (IconComponent) => (
  <IconComponent key={IconComponent.name} w={["4vh", "4vh", "5vh"]} />
);

export const SvgIconSet = {
  Languages: [
    { icon: renderIcon(ChakraIcons.JavaScript), name: "JavaScript" },
    { icon: renderIcon(ChakraIcons.TypeScript), name: "TypeScript" },
    { icon: renderIcon(ChakraIcons.Python), name: "Python" },
    { icon: renderIcon(ChakraIcons.Bash), name: "Bash" },
  ],
  Frontend: [
    { icon: renderIcon(ChakraIcons.React), name: "React" },
    { icon: renderIcon(ChakraIcons.NextJs), name: "NextJs" },
    { icon: renderIcon(ChakraIcons.Blender), name: "Blender" },
    { icon: renderIcon(ChakraIcons.ThreeJs), name: "ThreeJs" },
  ],
  Backend: [
    { icon: renderIcon(ChakraIcons.Node), name: "Node" },
    { icon: renderIcon(ChakraIcons.Deno), name: "Deno" },
    { icon: renderIcon(ChakraIcons.Flask), name: "Flask" },
    { icon: renderIcon(ChakraIcons.MySQL), name: "MySQL" },
  ],
  Infrastructure: [
    { icon: renderIcon(ChakraIcons.Aws), name: "Aws" },
    { icon: renderIcon(ChakraIcons.Vercel), name: "Vercel" },
    { icon: renderIcon(ChakraIcons.Docker), name: "Docker" },
    { icon: renderIcon(ChakraIcons.Terraform), name: "Terraform" },
  ],
};
