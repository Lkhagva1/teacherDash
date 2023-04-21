import React, { useContext, useEffect, useState } from "react";
import { Box, Card, HStack, UnorderedList } from "@chakra-ui/react";
import { Button, Text } from "@chakra-ui/react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  Heading,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import {
  Flex,
  Icon,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FiCheckSquare, FiX, FiCheck, FiUserX } from "react-icons/fi";
import { FcGraduationCap } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import moment from "moment";
import Tabledata from "./Tabledata";
const Tatten = () => {
  const [value, setValue] = useState([]);
  const [sClass, setSClass] = useState("");
  const [students, setStudents] = useState([]);
  const getStudentByClass = async (clsName) => {
    try {
      const response = await axios.post("http://localhost:5000/getStuByClass", {
        clsName,
      });
      console.log("stunsye", response);
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createProfile = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/tprofile", {
        id,
      });
      console.log("profle", response.data);
      // setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Cookies.get("TeacherUser")) {
      const userId = JSON.parse(Cookies.get("TeacherUser")).user._id;
      createProfile(userId);
    }
  }, []);

  const handleClick = (value) => {
    var obj = {
      value,
    };
    setSClass(obj);
    getStudentByClass(value);
  };
  let classNum = [1, 2, 3, 4, 5, 6];
  console.log("datata", students);

  return (
    <Box ml="225px" mt={"30px"} bg={"white"} rounded="lg" boxShadow={"lg"}>
      <Card p="12px 5px" mb="12px" pl={"20px"}>
        <HStack direction={"column"}>
          <Text fontSize="20px" fontWeight="bold">
            <FcGraduationCap />
          </Text>
          <Text fontSize="15px" fontWeight="bold">
            батлах
          </Text>
        </HStack>
      </Card>
      <Flex ml="25px">
        <Box>
          {classNum.map((item) => (
            <>
              <Button
                key={item}
                onClick={() => handleClick(item)}
                style={{
                  color: "black",
                  fontSize: "20px",
                  height: "30px",
                  textDecoration: "none",
                }}
              >
                <Button>
                  {/* <ListIcon as={FiEdit2} color="green.500" /> */}
                  <Link
                    to={`/attendance/${item}`}
                    style={{
                      color: "black",
                      fontSize: "20px",
                      height: "30px",
                      textDecoration: "none",
                    }}
                  >
                    {item}-курс
                  </Link>
                </Button>
              </Button>
            </>
          ))}
        </Box>
      </Flex>
      {students && <Tabledata sClass={sClass} students={students} />}
    </Box>
  );
};

export default Tatten;
