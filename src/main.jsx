import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import theme from "./theme/theme";

import { TopPage } from "./page/TopPage";
import { AppsPage } from "./page/AppsPage";
import { ProfilePage } from "./page/ProfilePage";
import { NoMatch } from "./page/NoMatchPage";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS={false} theme={theme}>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
