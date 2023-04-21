import React from "react";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import MyProfile from "../profile/MyProfile";
import MCalendar from "../../components/calendar/MCalendar";
import ComplexTable from "../../components/Table/ComplexTable";
import {
  columnsDataComplex,
  tableDataComplex,
} from "../../components/data/TableData";
import Task from "../../components/task/Task";

const Dashboard = () => {
  return (
    <Box>
      <MyProfile />
      <Box
        flexDirection="column"
        pt={{ base: "120px", md: "25px" }}
        ml="250px"
        mr={"20px"}
      >
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <MCalendar h="100%" minW="100%" selectRange={false} />
            <Task />
          </SimpleGrid>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
