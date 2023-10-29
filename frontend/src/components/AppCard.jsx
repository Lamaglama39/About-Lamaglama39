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
        w={["100%", "calc(49% - 1%)", "calc(33% - 1%)"]}
        marginBottom={"1.5em"}
        textAlign={"center"}
        className={"cardBox"}
        borderRadius={"0.5em"}
      >
        <Link href={AppLinks} isExternal textAlign={"center"}>
          <CardHeader
            padding={"0"}
            className={"cardBox"}
            borderTopRadius={"0.5em"}
          >
            <Image
              w={"100%"}
              objectFit="cover"
              borderTopRadius={"0.5em"}
              src={AppImage}
              alt={Name}
            />
          </CardHeader>
        </Link>
        <CardBody padding={"0"} className={"cardBox"}>
          <Heading fontSize={["1.5em"]} margin={"0"}>
            {Name}
          </Heading>

          <Text marginX={"1.5em"} fontSize={"1em"} textAlign={"left"}>
            {Description.split("\n").map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
        </CardBody>
        <CardFooter
          justifyContent={"end"}
          padding={"0.5em"}
          className={"cardBox"}
          borderBottomRadius={"0.5em"}
        >
          <Link href={GithubLinks} isExternal>
            <IconContext.Provider value={{ size: "2em" }}>
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
