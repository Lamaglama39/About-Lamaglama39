import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
import { IconContext } from "react-icons";
import { Link } from "@chakra-ui/react";

export const AppCard = ({ Name, AppImage, Description, Links }) => {
  return (
    <>
      <Card
        w={["90%", "90%", "calc(30% - 1%)"]}
        borderRadius={"20px"}
        border={"solid 2px gray"}
        marginBottom={"5vh"}
      >
        <CardHeader className="cardBoxTop" borderTopRadius={"17px"}>
          <Heading size="md" className="cardBoxTop">
            {Name}
          </Heading>
          <Image w={"10vw"} h={"10vw"} src={AppImage} alt={Name} />
        </CardHeader>
        <CardBody className="cardBox">
          <Text>{Description}</Text>
        </CardBody>
        <CardFooter className="cardBox" borderBottomRadius={"17px"}>
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
