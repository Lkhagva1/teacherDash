import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { BiLock, BiUserCircle } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Icon,
  Flex,
  Box,
  Image,
  Spinner,
} from "@chakra-ui/react";
import back from "../../assets/img/001.png";
const Login = () => {
  const [empolyee_id, setempolyee_id] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const context = useContext(AuthContext);
  return (
    <VStack w={"xs"} align={"flex-start"} spacing={10}>
      <HStack>
        <Image
          src={back}
          w={"50%"}
          height={"auto"}
          objectFit={"cover"}
          ml={"50px"}
        />
      </HStack>
      <HStack>
        <Heading
          fontSize={"lg"}
          fontWeight={"bold"}
          alignItems={"center"}
          ml={"80px"}
          color={"#45a735"}
        >
          Багшийн веб
        </Heading>
      </HStack>
      <VStack w={"full"} spacing={8}>
        <InputGroup alignItems={"center"} justifyContent={"center"}>
          <InputLeftElement children={<BiUserCircle color="black" />} />
          <Input
            variant={"flushed"}
            placeholder={"ID"}
            type={"text"}
            width={"full"}
            fontSize={15}
            fontWeight={"normal"}
            color={"#000"}
            value={empolyee_id}
            onChange={(e) => setempolyee_id(e.target.value)}
            _hover={{
              borderColor: "#45A735",
            }}
            _focus={{
              borderColor: "#45A735",
            }}
          />
        </InputGroup>

        <InputGroup justifyContent={"center"} alignContent={"center"}>
          <InputLeftElement
            pointerEvents="none"
            children={<BiLock color="black" />}
          />
          <Input
            variant={"flushed"}
            placeholder={"Нууц үг"}
            type={show ? "text" : "password"}
            width={"full"}
            fontSize={15}
            fontWeight={"normal"}
            color={"#000"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _hover={{
              borderColor: "#45A735",
            }}
            _focus={{
              borderColor: "#45A735",
            }}
            onKeyPress={(e) => {
              if (empolyee_id && password) {
                if (e.key === "Enter") {
                  context.loginHandler(empolyee_id, password);
                }
              }
            }}
          />
          <InputRightElement
            children={
              <Icon
                as={show ? FiEye : FiEyeOff}
                w={4}
                h={4}
                mr={"2"}
                color="#45A735"
                onClick={() => setShow(!show)}
                cursor={"pointer"}
              />
            }
          />
        </InputGroup>

        <HStack w={"full"} align={"center"} justify={"space-between"}>
          <Button
            variant={"link"}
            fontWeight={"normal"}
            fontSize={15}
            // color={"#000"}
            onClick={() => history.push("/signup")}
            alignItems={"center"}
            justifyContent={"center"}
          >
            Нууц үг сэргээх
            <Icon as={"<BiLockOpen />"} ml="1" />
          </Button>
        </HStack>
      </VStack>
      <Button
        width={"full"}
        bg="#45a735"
        color={"#f7f7f7"}
        _hover={{
          backgroundColor: "green",
          borderRadius: 5,
        }}
        disabled={empolyee_id && password && !context.isLoading ? false : true}
        onClick={() => context.loginHandler(empolyee_id, password)}
      >
        {context.isLoading ? <Spinner mr={2} size="sm" /> : null}
        Нэвтрэх
      </Button>
    </VStack>
  );
};

export default Login;
