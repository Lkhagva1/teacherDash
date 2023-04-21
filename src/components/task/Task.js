import React from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Checkbox,
  Card,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
// Custom components
// import Menu from "components/menu/MainMenu";

// Assets
import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import IconBox from "../icons/IconBox";

const Task = (props) => {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const brandColor = useColorModeValue("brand.300", "brand.400");
  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex alignItems="center" w="100%" mb="30px">
        <IconBox
          me="12px"
          w="38px"
          h="38px"
          bg={boxBg}
          icon={<Icon as={MdCheckBox} color={brandColor} w="24px" h="24px" />}
        />

        <Text color={textColor} fontSize="md" fontWeight="500">
          Даалгаврууд
        </Text>
        {/* <Menu ms="auto" /> */}
      </Flex>
      <Box px="11px">
        <Flex mb="20px">
          <Checkbox me="16px" colorScheme="green" />
          <Text
            // fontWeight="bold"
            color={textColor}
            fontSize="md"
            textAlign="start"
          >
            лекц 1 уншиж судлах
          </Text>
          <Icon
            ms="auto"
            as={MdDragIndicator}
            color="secondaryGray.600"
            w="24px"
            h="24px"
          />
        </Flex>
        <Flex mb="20px">
          <Checkbox me="16px" defaultChecked colorScheme="green" />
          <Text
            // fontWeight="bold"
            color={textColor}
            fontSize="md"
            textAlign="start"
          >
            семенар 1 даалгавар хийх
          </Text>
          <Icon
            ms="auto"
            as={MdDragIndicator}
            color="secondaryGray.600"
            w="24px"
            h="24px"
          />
        </Flex>
        <Flex mb="20px">
          <Checkbox defaultChecked me="16px" colorScheme="green" />
          <Text
            // fontWeight="bold"
            color={textColor}
            fontSize="md"
            textAlign="start"
          >
            бие даалт
          </Text>
          <Icon
            ms="auto"
            as={MdDragIndicator}
            color="secondaryGray.600"
            w="24px"
            h="24px"
          />
        </Flex>
        <Flex mb="20px">
          <Checkbox me="16px" colorScheme="green" />
          <Text
            // fontWeight="bold"
            color={textColor}
            fontSize="md"
            textAlign="start"
          >
            багийн ажиллагаа
          </Text>
          <Icon
            ms="auto"
            as={MdDragIndicator}
            color="secondaryGray.600"
            w="24px"
            h="24px"
          />
        </Flex>
      </Box>
    </Card>
  );
};

export default Task;
