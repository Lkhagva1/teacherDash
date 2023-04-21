import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Heading,
  HStack,
  TableContainer,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Input,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGraduationCap } from "react-icons/fc";
import { FiCheckSquare, FiX } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import TableData from "./TableData";
const Class2 = () => {
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
    setSClass(value);
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
                  <Link
                    to={`/mark/${item}`}
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
      {students && (
        <TableData sClass={sClass} students={students} mark={true} />
      )}
    </Box>
  );
};

export default Class2;
// {/* <>
//         <Modal
//           show={show}
//           onHide={handleClose}
//           backdrop="static"
//           keyboard={false}
//         >
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Upload {uName}'s Mark</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody pb={6}>
//               <FormControl>
//                 <FormLabel>semester</FormLabel>
//                 <Input
//                   type="number"
//                   placeholder="Semester"
//                   value={sem}
//                   onChange={(e) => setSem(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl mt={4}>
//                 <FormLabel>Subject Name</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Subject Name"
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl mt={4}>
//                 <FormLabel>mark</FormLabel>
//                 <Input
//                   type="number"
//                   placeholder="mark"
//                   value={smark}
//                   className="form-control mod_input_class"
//                   onChange={(e) => setMark(e.target.value)}
//                 />
//               </FormControl>
//               {/* <Button onClick={() => handleRequest()}>Submit</Button> */}
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   colorScheme="blue"
//                   mr={3}
//                   onClick={() => handleRequest()}
//                 >
//                   Save
//                 </Button>
//                 <Button onClick={handleClose}>close</Button>
//                 <Button variant="primary">Understood</Button>
//               </ModalFooter>
//             </ModalContent>
//           </Modal>
//         </> */}
