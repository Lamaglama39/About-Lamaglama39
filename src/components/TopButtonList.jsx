import { TopButton } from "../components/TopButton";

export const TopButtonList = ({ onNavigate }) => {
  const buttonNameList = [
    ["Top", "/"],
    ["Apps", "/apps"],
    ["Profile", "/profile"],
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