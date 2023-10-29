import { TopButton } from "../components/TopButton";
import PropTypes from "prop-types";

export const TopButtonList = ({ onNavigate }) => {
  const buttonNameList = [
    ["Top", "/"],
    ["Apps", "/apps"],
    ["Info", "/info"],
  ];

  return (
    <>
      {buttonNameList.map((buttonName) => {
        return (
          <TopButton
            key={buttonName[0]}
            buttonName={buttonName[0]}
            routeName={buttonName[1]}
            onNavigate={onNavigate}
          />
        );
      })}
    </>
  );
};

TopButtonList.propTypes = {
  onNavigate: PropTypes.string,
};
