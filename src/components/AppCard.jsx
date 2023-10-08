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
  AppLinks,
  GithubLinks,
}) => {
  return (
    <>
      <Card
        w={["100%", "100%", "calc(33% - 1%)"]}
        marginBottom={"5vh"}
        textAlign={"center"}
      >
        <Link href={AppLinks} isExternal textAlign={"center"}>
          <CardHeader padding={"1px"}>
            <Image h={"15vh"} src={AppImage} alt={Name} />
          </CardHeader>
        </Link>
        <CardBody padding={"0"}>
          <Heading fontSize={["16px", "24px", "24px"]}>{Name}</Heading>

          <Text margin={"10px"}>
            {Description.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
        </CardBody>
        <CardFooter justifyContent={"end"} padding={"10px"}>
          <Link href={GithubLinks} isExternal>
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
  AppLinks: PropTypes.string.isRequired,
  GithubLinks: PropTypes.string.isRequired,
};
