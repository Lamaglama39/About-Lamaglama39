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
    renderIcon(ChakraIcons.JavaScript),
    renderIcon(ChakraIcons.TypeScript),
    renderIcon(ChakraIcons.Python),
    renderIcon(ChakraIcons.Bash),
  ],
  Frontend: [
    renderIcon(ChakraIcons.React),
    renderIcon(ChakraIcons.NextJs),
    renderIcon(ChakraIcons.Blender),
    renderIcon(ChakraIcons.ThreeJs),
  ],
  Backend: [
    renderIcon(ChakraIcons.Node),
    renderIcon(ChakraIcons.Deno),
    renderIcon(ChakraIcons.Flask),
    renderIcon(ChakraIcons.MySQL),
  ],
  Infrastructure: [
    renderIcon(ChakraIcons.Aws),
    renderIcon(ChakraIcons.Vercel),
    renderIcon(ChakraIcons.Docker),
    renderIcon(ChakraIcons.Terraform),
  ],
};
