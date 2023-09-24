import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Box } from "@chakra-ui/react";

import theme from "./theme/theme";
import "./index.css";

import { NavigationContext } from "./components/NavigationContext";
import { TopPage } from "./page/TopPage";
import { AppsPage } from "./page/AppsPage";
import { ProfilePage } from "./page/ProfilePage";
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
        <Box className="Pages" height={"100vh"} width={"100vw"}>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </NavigationContext.Provider>
  );
};
