import { InfoCardList } from "./InfoCardList";

export const InfoCard = () => {
  const CardList = [
    { IconName: "SiGithub", UrlLink: "https://github.com/Lamaglama39" },
    { IconName: "RiTwitter", UrlLink: "https://twitter.com/lamaglama39" },
    { IconName: "SiQiita", UrlLink: "https://qiita.com/Lamaglama39" },
    { IconName: "SiZenn", UrlLink: "https://zenn.dev/lamaglama39" },
  ];

  return (
    <>
      {CardList.map((Card) => (
        <InfoCardList
          key={Card.IconName}
          IconName={Card.IconName}
          UrlLink={Card.UrlLink}
        ></InfoCardList>
      ))}
    </>
  );
};
