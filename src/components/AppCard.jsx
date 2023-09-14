import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
import { IconContext } from "react-icons";
import { Link } from "@chakra-ui/react";

export const AppCard = ({ Name, AppImage, Description, Links }) => {
  return (
    <>
      <Card
        bg={"lightgray"}
        w={"100%"}
        h={"100%"}
        borderRadius={"15px"}
        border={"solid 1px black"}
        marginBottom={"2vh"}
      >
        <CardHeader bg={"skyblue"} borderTopRadius={"15px"}>
          <Heading size="md">{Name}</Heading>
          <Image w={"30%"} h={"30%"} src={AppImage} alt={Name} />
        </CardHeader>
        <CardBody w={"30%"} h={"30%"}>
          <Text>{Description}</Text>
        </CardBody>
        <CardFooter w={"30%"} h={"30%"}>
          <Link href={Links}>アプリへGO!!!</Link>
          <Link href={Links}>
            <IconContext.Provider value={{ color: "black", size: "4vh" }}>
              <SiGithub></SiGithub>
            </IconContext.Provider>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};
