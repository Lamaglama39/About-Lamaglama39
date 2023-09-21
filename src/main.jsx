import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./index.css";

import theme from "./theme/theme";

import { TopBar } from "./page/TopBar";
import { TopPage } from "./page/TopPage";
import { AppsPage } from "./page/AppsPage";
import { ProfilePage } from "./page/ProfilePage";
import { NoMatch } from "./page/NoMatchPage";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS={false} theme={theme}>
        <Box bg={"softGreen"} height={"100vh"} width={"100vw"}>
          <TopBar></TopBar>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
