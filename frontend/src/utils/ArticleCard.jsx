import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  textDecoration,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";

import { IconContext } from "react-icons";
import { Link } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const ArticleCard = ({
  // key,
  comments_count,
  created_at,
  id,
  likes_count,
  page_views_count,
  private: isPrivate,
  tags,
  title,
  updated_at,
  url,
}) => {
  const createTagIcon = (tag, id) => {
    return (
      <Box
        key={id}
        elevation={2}
        borderRadius={"0.3em"}
        padding={"0.3em"}
        marginX={"0.5em"}
        display={"flex"}
        alignItems={"center"}
        fontSize={"1em"}
      >
        <CiShoppingTag />
        {tag.name}
      </Box>
    );
  };

  function formatDateTime(dateString) {
    const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("ja-JP", optionsDate);
    const formattedTime = date.toLocaleTimeString("ja-JP", optionsTime);

    return `${formattedDate} ${formattedTime}`;
  }

  const StatBox = ({ icon, count }) => (
    <Box w={"33%"} alignItems={"center"} display={"flex"}>
      <Box alignItems={"center"} marginRight="0.5em">
        {icon}
      </Box>
      {count}
    </Box>
  );

  return (
    <>
      <Card
        w={["100%", "100%", "calc(50% - 3%)"]}
        borderRadius={"0.5em"}
        className={"cardBox"}
        h={"100%"}
      >
        <Link href={url} isExternal _hover={"none"}>
          <CardHeader
            padding={"0.5em"}
            className={"cardBox"}
            borderTopRadius={"0.5em"}
            background={"green.600"}
          >
            <Heading fontSize={["1.5em"]} margin={"0"}>
              {title}
            </Heading>
          </CardHeader>
          <CardBody padding={"0.5em"} className={"cardBox"}>
            <Text
              fontSize={"1em"}
              display={"flex"}
              flexFlow={["column"]}
              margin={"0"}
            >
              <Text margin={"0"} padding={"0"}>
                作成日: {formatDateTime(created_at)}
              </Text>
              <Text margin={"0"} padding={"0"}>
                更新日: {formatDateTime(updated_at)}
              </Text>
            </Text>
            <Box fontSize={"1em"} display={"flex"}>
              {tags.map((tag, index) => createTagIcon(tag, index))}
            </Box>
          </CardBody>
          <CardFooter
            padding={"0"}
            paddingBottom={"0.5em"}
            className={"cardBox"}
            borderBottomRadius={"0.5em"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              w={"50%"}
              marginX={"1em"}
            >
              <StatBox icon={<FaHeart />} count={likes_count} />
              <StatBox icon={<FaRegEye />} count={page_views_count} />
              <StatBox icon={<FaRegCommentDots />} count={comments_count} />
            </Box>
          </CardFooter>
        </Link>
      </Card>
    </>
  );
};

ArticleCard.propTypes = {
  key: PropTypes.number.isRequired,
  comments_count: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes_count: PropTypes.number.isRequired,
  page_views_count: PropTypes.number.isRequired,
  private: PropTypes.bool.isRequired,
  tags: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
