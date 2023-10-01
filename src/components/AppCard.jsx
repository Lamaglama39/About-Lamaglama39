import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { SiGithub } from "react-icons/si";
import { IconContext } from "react-icons";
import { Link } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

export const AppCard = ({
  Name,
  AppImage,
  Description,
  AppLink,
  GithubLink,
}) => {
  return (
    <>
      <Card
        w={["90%", "90%", "calc(30% - 1%)"]}
        borderRadius={"20px"}
        border={"solid 2px gray"}
        marginBottom={"5vh"}
        className="cardBoxTop"
      >
        <Link href={AppLink} isExternal textAlign={"center"}>
          <CardHeader
            className="cardBoxTop"
            borderTopRadius={"17px"}
            padding={"1px"}
          >
            <Heading size="md" className="cardBoxTop">
              {Name}
            </Heading>
            <Image h={"15vh"} src={AppImage} alt={Name} />
          </CardHeader>
        </Link>
        <CardBody className="cardBox" padding={"0"}>
          <Text margin={"10px"}>
            {Description.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
        </CardBody>
        <CardFooter
          className="cardBox"
          borderBottomRadius={"17px"}
          justifyContent={"end"}
          padding={"10px"}
        >
          <Link href={GithubLink} isExternal>
            <IconContext.Provider value={{ color: "black", size: "4vh" }}>
              <SiGithub></SiGithub>
            </IconContext.Provider>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

AppCard.propTypes = {
  Name: PropTypes.string.isRequired,
  AppImage: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  AppLink: PropTypes.string.isRequired,
  GithubLink: PropTypes.string.isRequired,
};
