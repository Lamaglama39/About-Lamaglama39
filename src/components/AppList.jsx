import { Box } from "@chakra-ui/react";
import { AppCard } from "./AppCard";
import { AppInfoList } from "../utils/AppInfoList";

export const AppList = () => {
  return (
    <>
      <Box height={"5vh"}></Box>
      <Box
        paddingTop={"5vh"}
        paddingX={"5vh"}
        display={"flex"}
        flexFlow={["column", "row wrap", "row wrap"]}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {AppInfoList.map((App) => (
          <AppCard
            key={App.AppName}
            Name={App.AppName}
            AppImage={App.AppImagePath}
            Description={App.AppDescription}
            AppLinks={App.AppLink}
            GithubLinks={App.GithubLink}
          ></AppCard>
        ))}
      </Box>
    </>
  );
};
