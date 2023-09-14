import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";

import { Top } from "./components/Top";
import { Apps } from "./components/Apps";
import { Profile } from "./components/Profile";
import { NoMatch } from "./components/NoMatch";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS={false}>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
