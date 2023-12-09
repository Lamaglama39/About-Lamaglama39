import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { TopDrawerItem } from "./TopDrawerItem";
import { Box } from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

export const TopDrawer = ({ display }) => {
  const buttonNameList = [
    ["Top", "/"],
    ["Profile", "/profile"],
    ["Apps", "/apps"],
    ["Articles", "/article"],
    ["Info", "/info"],
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Button
          onClick={onOpen}
          zIndex="docked"
          marginTop={["0.25em"]}
          marginLeft={["0.25em"]}
          background={"none"}
          border={"none"}
          position={"fixed"}
          cursor={"pointer"}
          h={"2.5em"}
          w={"2.5em"}
          display={display}
        >
          <HamburgerIcon fontSize={"2em"} />
        </Button>
      </Box>
      <Drawer placement={"top"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderBottomRadius={"3em"}>
          <DrawerHeader margin="0" padding="0">
            <DrawerCloseButton
              left={"0.5em"}
              marginY={["0.25em"]}
              border={"none"}
              cursor={"pointer"}
              fontSize={"1em"}
              className={"TopBar"}
              _hover={{
                filter: "brightness(1.50)",
                transition: "0.3s",
              }}
            />
          </DrawerHeader>
          <DrawerBody
            className="TopBar"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderBottomRadius={"3em"}
          >
            {buttonNameList.map((buttonName) => {
              return (
                <>
                  <TopDrawerItem
                    key={buttonName[0]}
                    buttonName={buttonName[0]}
                    routeName={buttonName[1]}
                  />
                </>
              );
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
