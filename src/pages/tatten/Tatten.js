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
const Tatten = (props) => {
  const [currentDate, setCurrentDate] = useState("");
  const [value, setId] = useState([]);
  const [profile, setProfile] = useState([]);
  const [students, setStudents] = useState([]);
  const [sClass, setSClass] = useState("");
  const getStudentByClass = async (clsName) => {
    // console.log("profile..", clsName);
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
  const makeStuAttendance = async (clsName, obj) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/makeAttdence",
        obj,
        config
      );

      console.log("response", response);

      const response1 = await axios.post(
        "http://localhost:5000/getStuByClass",
        clsName
      );
      console.log(response1);
    } catch (error) {
      console.log("erroe", error);
    }
  };
  const createProfile = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/tprofile", {
        id,
      });
      console.log("profle", response.data);
      setProfile(response.data);
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
    setSClass(value);
    getStudentByClass(value);
  };
  let classNum = [1, 2, 3, 4, 5, 6];
  console.log("datata", students);

  const exTractNumber = (str) => {
    return str.replace(/[^0-9]/g, "");
  };

  var ans, curDate;

  const newFun = async () => {
    const formatted = moment(Date.now()).format("L");

    curDate = await exTractNumber(formatted);
    setCurrentDate(curDate);
  };

  newFun();

  const makeAttendance = async (student, value) => {
    let currentTimestamp = Date.now();

    const formatted = moment(currentTimestamp).format("L");

    ans = await exTractNumber(formatted);
    const Obj = {
      timestamp: currentTimestamp,
      type: value,
      StudentId: student._id,
      dateId: ans,
    };

    var another = {
      clsName: sClass,
    };
    makeStuAttendance(another, Obj);
    getStudentByClass(another);
  };
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
      <Flex p={6} direction="column">
        <Heading mb={4}></Heading>
        <TableContainer>
          <Table size="sm" variant="striped" alignItems="flex-end">
            <Thead>
              <Tr>
                <Th w="10%">No.</Th>
                <Th>нэр</Th>
                <Th>код</Th>
                <Th>анги</Th>
                <Th>утас</Th>
                <Th>эллсэн он</Th>
                <Th>статус</Th>
              </Tr>
            </Thead>
            {students &&
              students &&
              students.map((item, index) => (
                <Tbody key={item}>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.Roll_No}</Td>
                    <Td>{item.clsName}</Td>
                    <Td>{item.mobile}</Td>
                    <Td>{item.addmision_year}</Td>
                    <Td>
                      {item &&
                      item.pList &&
                      item.pList.includes(currentDate) ? (
                        <>
                          {item.attdenList.filter(
                            (ele) => ele.dateId === currentDate
                          ) ? (
                            <>
                              <Text>
                                {
                                  item.attdenList[item.attdenList.length - 1]
                                    .type
                                }
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text>okkk</Text>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <Button
                            color="green"
                            onClick={() => makeAttendance(item, "зөвшөөрсөн")}
                          >
                            <FiCheckSquare />
                          </Button>
                          <Button
                            color="red"
                            onClick={() => makeAttendance(item, "зөвшөөрөхгүй")}
                          >
                            <FiX />
                          </Button>
                        </>
                      )}
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};

export default Tatten;
