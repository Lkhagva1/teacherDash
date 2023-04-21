import React, { useState } from "react";
import {
  Heading,
  TableContainer,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Input,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { FiX, FiCheck, FiUserX } from "react-icons/fi";
const Tabledata = ({ students, sClass, mark }) => {
  const [currentDate, setCurrentDate] = useState("");
  const toast = useToast();
  const id = "toast";
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
  const exTractNumber = (str) => {
    return str.replace(/[^0-9]/g, "");
  };

  var ans, curDate;

  const newFun = async () => {
    const formatted = moment(Date.now()).format("L");

    curDate = await exTractNumber(formatted);
    setCurrentDate(curDate);
  };

  //   newFun();

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
  };
  return (
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
                    {item && item.pList && item.pList.includes(currentDate) ? (
                      <>
                        {item.attdenList.filter(
                          (ele) => ele.dateId === currentDate
                        ) ? (
                          <>
                            <Text>
                              {item.attdenList[item.attdenList.length - 1].type}
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
  );
};

export default Tabledata;
