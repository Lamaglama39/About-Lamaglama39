import { useEffect, useContext } from "react";
import { NavigationContext } from "../components/NavigationContext";
import { useBreakpointValue } from "@chakra-ui/react";

export const usePageSetup = () => {
  const { inProp, setInProp } = useContext(NavigationContext);

  useEffect(() => {
    setInProp(true);
  }, [setInProp]);

  const classNames = useBreakpointValue({
    base: "slideY",
    sm: "slideY",
    md: "slideX",
  });

  return { inProp, classNames };
};
