import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "@chakra-ui/react";
import { ProfileIcon } from "../utils/ProfileIcon";

export const ProfileCardList = ({ IconName, UrlLink }) => {
  const IconComponent = ProfileIcon[IconName];

  return (
    <Link href={UrlLink} isExternal marginRight={["", "", "6vh"]}>
      <Box
        border={"2px solid black"}
        padding={"2vh"}
        display={"flex"}
        textAlign={"center"}
        borderRadius={"15px"}
        marginTop={"2vh"}
        className="cardBox"
      >
        {IconComponent}
      </Box>
    </Link>
  );
};

ProfileCardList.propTypes = {
  IconName: PropTypes.string.isRequired,
  UrlLink: PropTypes.string.isRequired,
};
