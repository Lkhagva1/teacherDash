import React, { useContext, useEffect } from "react";
import MyProfile from "./MyProfile";

import ProfileInfo from "./ProfileInfo";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ViewProfile = () => {
  const [profile, setProfile] = useState();
  const createProfile = async (id) => {
    console.log("profile..", id);
    try {
      const response = await axios.post("http://localhost:5000/tprofile", {
        id,
      });
      console.log(response.data);
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
  return (
    <Flex direction="column">
      <MyProfile data={profile} />
      <Box
        flexDirection="column"
        pt={{ base: "120px", md: "25px" }}
        ml="250px"
        mr={"20px"}
      >
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
          templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
          gap="22px"
        >
          <ProfileInfo data={profile} />
          {/* <Platformset /> */}
        </Grid>
      </Box>
    </Flex>
  );
};

export default ViewProfile;
