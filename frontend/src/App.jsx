import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import theme from "./theme/theme";
import "./index.css";
import "./App.css";

import { TopBar } from "./components/TopBar";
import { NavigationContext } from "./components/NavigationContext";
import { TopPage } from "./page/TopPage";
import { ProfilePage } from "./page/ProfilePage";
import { AppsPage } from "./page/AppsPage";
import { ArticlesPage } from "./page/ArticlesPage";
import { InfoPage } from "./page/InfoPage";
import { NoMatch } from "./page/NoMatchPage";

export const App = () => {
  const navigate = useNavigate();

  const [inProp, setInProp] = useState(false);

  const handleExitAndNavigate = (route) => {
    setInProp(false);
    setTimeout(() => {
      navigate(route);
    }, 900);
  };

  return (
    <NavigationContext.Provider
      value={{ navigate: handleExitAndNavigate, setInProp, inProp }}
    >
      <ChakraProvider resetCSS={false} theme={theme}>
        <TopBar></TopBar>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/apps" element={<AppsPage />} />
          <Route path="/article" element={<ArticlesPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ChakraProvider>
    </NavigationContext.Provider>
  );
};
