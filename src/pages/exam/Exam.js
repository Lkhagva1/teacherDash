import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  HStack,
  SimpleGrid,
  Text,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import { FcGraduationCap } from "react-icons/fc";
import axios from "axios";
const Exam = () => {
  return (
    <Box ml="225px" mt={"30px"}>
      <Card p="12px 5px" mb="12px" pl={"20px"}>
        <HStack direction={"column"}>
          <Text fontSize="20px" fontWeight="bold">
            <FcGraduationCap />
          </Text>
          <Text fontSize="15px" fontWeight="bold">
            Мэдэгдэлүүд
          </Text>
        </HStack>
      </Card>
      <SimpleGrid spacing={4} columns={5} ml={"30px"}>
        {/* {notice &&
          notice.posts &&
          notice.posts.map((item) => (
            <>
              <Card key={item._id}>
                <CardHeader>
                  <Heading size="Sm"> {item.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{item.content}</Text>
                </CardBody>
              </Card>
            </>
          ))}  */}
      </SimpleGrid>
    </Box>
  );
};

export default Exam;
