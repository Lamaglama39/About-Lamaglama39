import { createContext } from "react";

const NavigationContext = createContext({
  navigate: () => {},
  inProp: false,
  setInProp: () => {},
});

export { NavigationContext };
