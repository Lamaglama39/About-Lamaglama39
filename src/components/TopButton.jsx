import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

export const TopButton = ({ buttonName }) => {
  return (
    <div>
      <Button
        width={"15vw"}
        height={"4vh"}
        fontSize={"2vh"}
        colorScheme="green"
      >
        {buttonName}
      </Button>
    </div>
  );
};

TopButton.propTypes = {
  buttonName: PropTypes.string.isRequired,
};
