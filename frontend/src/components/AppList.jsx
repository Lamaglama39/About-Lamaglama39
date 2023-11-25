import { Box } from "@chakra-ui/react";
import { AppCard } from "./AppCard";
import { AppInfoList } from "../utils/AppInfoList";
import { forwardRef } from "react";

export const AppList = forwardRef((props, ref) => {
  return (
    <>
      <Box height={"4em"}></Box>
      <Box
        padding={"2em"}
        display={"flex"}
        flexFlow={["column", "row wrap", "row wrap"]}
        justifyContent={"space-between"}
        ref={ref}
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
});

AppList.displayName = "AppList";
