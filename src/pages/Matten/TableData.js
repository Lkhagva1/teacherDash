import React, { useState } from "react";
import {
  Heading,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const TableData = ({ students, sClass, mark }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const id = "toast";
  const [uName, setuName] = useState("");
  const [ID, setId] = useState("");
  const [sem, setSem] = useState("");
  const [subject, setSubject] = useState("");
  const [smark, setMark] = useState("");

  const uploadStuMark = async (clsName, obj) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/uploadMark",
        obj,
        config
      );
      console.log("response", response);
      if (!toast.isActive(id)) {
        toast({
          id,
          duration: 2000,
          position: "top",
          status: "success",
          description: "амжилттай дүн тавьлаа!",
        });
      }
      const response1 = await axios.post(
        "http://localhost:5000/getStuByClass",
        clsName
      );
      console.log("res", response1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => onClose();
  const handleShow = (item) => {
    onOpen();
    setId(item._id);
    setuName(item.name);
  };

  const handleRequest = () => {
    const obj = {
      ID,
      sem,
      smark,
      subject,
    };
    var another = {
      clsName: sClass,
    };
    uploadStuMark(another, obj);
    onClose();
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
                  {mark ? (
                    <>
                      <Td>
                        <Button onClick={() => handleShow(item)}>
                          <FiCheckSquare />
                        </Button>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>
                        <Button color="red">xxxxx</Button>
                      </Td>
                    </>
                  )}
                </Tr>
              </Tbody>
            ))}
        </Table>
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> {uName}'ийн дүн оруулах</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>улирал</FormLabel>
                  <Input
                    type="number"
                    placeholder="улирал"
                    value={sem}
                    onChange={(e) => setSem(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>хичээлийн нэр</FormLabel>
                  <Input
                    type="text"
                    placeholder="хичээлийн нэр"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Дүн</FormLabel>
                  <Input
                    type="number"
                    placeholder="дүн"
                    value={smark}
                    className="form-control mod_input_class"
                    onChange={(e) => setMark(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => handleRequest()}
                >
                  оруулах
                </Button>
                <Button colorScheme="red" onClick={handleClose}>
                  Гарах
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </TableContainer>
    </Flex>
  );
};

export default TableData;
