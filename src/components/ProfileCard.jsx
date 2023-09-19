import { ProfileCardList } from "./ProfileCardList";

export const ProfileCard = () => {
  const CardList = [
    { IconName: "SiGithub", UrlLink: "URLs" },
    { IconName: "SiGmail", UrlLink: "URLs" },
    { IconName: "SiQiita", UrlLink: "URLs" },
    { IconName: "SiZenn", UrlLink: "URLs" },
  ];

  return (
    <>
      {CardList.map((Card) => (
        <ProfileCardList
          IconName={Card.IconName}
          UrlLink={Card.UrlLink}
        ></ProfileCardList>
      ))}
    </>
  );
};
