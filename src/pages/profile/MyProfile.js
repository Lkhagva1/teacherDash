import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiAward,
  FiSend,
  FiMail,
  FiLayers,
  FiSlack,
} from "react-icons/fi";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import ProfileBgImage from "../../assets/img/ProfileBackground.png";
import img from "../../assets/img/BackgroundCard1.png";
import Cookies from "js-cookie";
import axios from "axios";
const MyProfile = ({ data }) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  });

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dvfpkko1z");
    fetch("https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createUp = async (pic) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("jwt"),
      },
    };
    try {
      const res = await axios.put("http://localhost:5000/tupdatepic", {
        pic,
        config,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFields = () => {
    createUp(url);
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  const textColor = useColorModeValue("gray.800", "white");
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0.5) 110.84%)"
    // "linear-gradient(to right, #a1ffce, #faffd1)"
  );
  return (
    <Box
      flexDirection="column"
      pt={{ base: "120px", md: "25px" }}
      ml="250px"
      mr={"20px"}
    >
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          bgImage={ProfileBgImage}
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            {/* {prof.map((e, index) => ( */}
            {data && (
              <>
                <Flex
                  align="center"
                  mb={{ sm: "10px", md: "0px" }}
                  direction={{ sm: "column", md: "row" }}
                  w={{ sm: "100%" }}
                  textAlign={{ sm: "center", md: "start" }}
                >
                  <Avatar
                    me={{ md: "22px" }}
                    src={data[0].pic}
                    alt="mahen"
                    w="80px"
                    h="80px"
                    borderRadius="15px"
                  />
                  <Flex direction="column" maxWidth="100%" ml={{ sm: "5px" }}>
                    <Flex align="center">
                      <FiUser />
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        me="10px"
                        ml={"6px"}
                      >
                        Овог нэр:{" "}
                      </Text>
                      <Text fontSize="md" fontWeight="bold">
                        {data[0].surname}
                      </Text>
                      <Text fontSize="md" fontWeight="bold" ml={"10px"}>
                        {data[0].name}
                      </Text>
                    </Flex>
                    <Flex align="center" mt={"10px"}>
                      <FiMail />
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        me="10px"
                        ml={"6px"}
                      >
                        Цахим хаяг:{" "}
                      </Text>
                      <Text fontSize="md" fontWeight="bold">
                        {data[0].email}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction="column" maxWidth="100%" ml={{ sm: "30px" }}>
                    <Flex align="center">
                      <FiLayers />
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        me="10px"
                        ml={"6px"}
                      >
                        код:{" "}
                      </Text>
                      <Text fontSize="md" fontWeight="bold">
                        {data[0].empolyee_id}
                      </Text>
                      <Text fontSize="md" fontWeight="bold"></Text>
                    </Flex>
                    <Flex align="center" mt={"10px"}>
                      <FiSlack />
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        me="10px"
                        ml={"6px"}
                      >
                        элссэн он:{" "}
                      </Text>
                      <Text fontSize="md" fontWeight="bold">
                        {data[0].joining_year}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}

            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            >
              <Button
                p="0px"
                bg="transparent"
                _hover={{ bg: "none" }}
                textDecoration={"none"}
                // onClick={() => createProfile()}
              >
                <Link href="/profile" textDecoration={"none"}>
                  <Flex
                    align="center"
                    w={{ sm: "100%", lg: "135px" }}
                    bg="hsla(0,0%,100%,.3)"
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    boxShadow="inset 0 0 1px 1px hsl(0deg 0% 100% / 90%), 0 20px 27px 0 rgb(0 0 0 / 5%)"
                    border="1px solid gray.200"
                    cursor="pointer"
                  >
                    <FaCube w="100%" h="100%" />
                    <Text
                      fontSize="xs"
                      color={textColor}
                      fontWeight="bold"
                      ms="6px"
                    >
                      Профайл
                    </Text>
                  </Flex>
                </Link>
              </Button>
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Link href="/profile/edit" textDecoration={"none"}>
                  <Flex
                    align="center"
                    w={{ lg: "135px" }}
                    borderRadius="15px"
                    justifyContent="center"
                    py="10px"
                    mx={{ lg: "1rem" }}
                    cursor="pointer"
                  >
                    <IoDocumentsSharp w="100%" h="100%" />
                    <Text
                      fontSize="xs"
                      color={textColor}
                      fontWeight="bold"
                      ms="6px"
                    >
                      мэдээлэл засах
                    </Text>
                  </Flex>
                </Link>
              </Button>
              <Button p="0px" bg="transparent" _hover={{ bg: "none" }}>
                <Flex
                  align="center"
                  w={{ lg: "135px" }}
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  cursor="pointer"
                >
                  <FaPenFancy w="100%" h="100%" />
                  <Text
                    fontSize="xs"
                    color={textColor}
                    fontWeight="bold"
                    ms="6px"
                  >
                    Даалгавар
                  </Text>
                </Flex>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
