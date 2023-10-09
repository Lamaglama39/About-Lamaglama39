import { ProfileCardList } from "./ProfileCardList";

export const ProfileCard = () => {
  const CardList = [
    { IconName: "SiGithub", UrlLink: "https://github.com/Lamaglama39" },
    { IconName: "SiGmail", UrlLink: "URLs" },
    { IconName: "SiQiita", UrlLink: "https://qiita.com/Lamaglama39" },
    { IconName: "SiZenn", UrlLink: "https://zenn.dev/lamaglama39" },
  ];

  return (
    <>
      {CardList.map((Card) => (
        <ProfileCardList
          key={Card.IconName}
          IconName={Card.IconName}
          UrlLink={Card.UrlLink}
        ></ProfileCardList>
      ))}
    </>
  );
};
