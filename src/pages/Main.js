import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
const Main = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      as="section"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "unset" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} />
      <Box>{children}</Box>
    </Box>
  );
};

export default Main;
