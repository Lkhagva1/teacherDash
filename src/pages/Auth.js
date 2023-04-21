import React from "react";
import { HStack, Image, VStack, Box, Stack } from "@chakra-ui/react";
import back from "../assets/img/2302.q702.010.S.m005.c12.student campus.jpg";
const Auth = ({ children }) => {
  return (
    <HStack w={"full"} h={"100vh"} bg="#fff">
      <VStack w={"100%"} h={"100%"}>
        <Image src={back} height={"100%"} objectFit={"cover"} />
      </VStack>
      <HStack
        h={"full"}
        align={"center"}
        justify={"center"}
        borderRadius={"md"}
      >
        {children}
      </HStack>
    </HStack>
  );
};

export default Auth;
