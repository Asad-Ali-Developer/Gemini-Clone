import { useEffect, useState } from "react";
import { Box, HStack, Icon, Show, Text, useColorMode, VStack } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineSettings, MdHistory } from "react-icons/md";
import { motion } from "framer-motion";
import '../../index.css';

import {
  lightTheme,
  darkThemeForNewChat,
  lightThemeForNewChat,
  backgroundColorForQuerieForHoverForDarkTheme,
  backgroundColorForQueriyForHoverForLightTheme,
  backgroundColorForQueryOptionForHoverForDarkTheme,
  backgroundColorForQueryOptionForHoverForLightTheme,
} from "../../theme";

const Sidebar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mouseEnter, setMouseEnter] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsCollapsed(true);
  //   }, 5000)
  // }, [])

  const Queries = [
    { id: 1, query: "What is React Ts" },
    { id: 2, query: "What is Kubernetes" },
    { id: 3, query: "What is Next Ts" },
  ];

  toggleColorMode

  const handlers = [
    { id: 1, icon: IoIosHelpCircleOutline, title: "Help" },
    { id: 2, icon: MdHistory, title: "Activity" },
    { id: 3, icon: MdOutlineSettings, title: "Settings" },
  ];

  return (
    <>
      <Show above="lg">
        <Box
          as={motion.div}
          className="Sidebar"
          transition="width 0.3s ease"
          bg={colorMode === "dark" ? '#1e1f20' : lightTheme}
          height="100vh"
          width={{
            base: "5vw", // Default for small screens
            md: isCollapsed ? "3vw" : "18vw",
            lg: isCollapsed ? "5vw" : "18vw",
            xl: isCollapsed ? "4vw" : "18vw",
          }}
          px={isCollapsed ? 3 : 5}
          py={5}
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          position="relative"
        >
          <VStack spacing={8} alignItems="start" w="100%">


            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              width="100%">

              {/* Menu Icon */}
              <Box
                p={1}
                ml={1.5}
                borderRadius={10}
                _hover={{
                  backgroundColor:
                    colorMode === "dark"
                      ? backgroundColorForQuerieForHoverForDarkTheme
                      : backgroundColorForQueriyForHoverForLightTheme,
                }}
              >
                <MdMenu
                  size={25}
                  cursor="pointer"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                />
              </Box>

              {/* New Chat */}
              <HStack
                mt={10}
                bg={
                  colorMode === "dark"
                    ? darkThemeForNewChat
                    : lightThemeForNewChat
                }
                px={2}
                py={2}
                cursor="pointer"
                borderRadius={10}
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <FiPlus size={20} />
                <Show above="lg">
                  {!isCollapsed && (
                    <Text fontSize={{ md: "md", lg: "md" }}>New Chat</Text>
                  )}
                </Show>
              </HStack>

              {/* Recent Queries */}
              {!isCollapsed && (
                <Show above="lg">
                  <VStack
                    mt={8}
                    py={3}
                    height="50vh"
                    width="100%"
                    display="flex"
                    overflow="hidden"
                    flexDirection="column"
                    alignItems="start"
                    gap={3}
                  >
                    <Text fontSize={{ md: "sm", lg: "sm" }} fontWeight="bold">
                      Recent
                    </Text>

                    <Box display="flex" w="100%" flexDirection="column" gap={2}>
                      {Queries.map((query, index) => (
                        <HStack
                          w="100%"
                          py={2}
                          px={3}
                          gap={4}
                          display="flex"
                          key={query.id}
                          as={motion.div}
                          cursor="pointer"
                          overflow="hidden"
                          borderRadius={20}
                          alignItems="center"
                          transition="enter 0.3s ease"
                          justifyContent="space-between"
                          backgroundColor={
                            selectedIndex === index ? "#004a77" : ""
                          }
                          color={selectedIndex === index ? "#fff" : ""}
                          onClick={() => {
                            setSelectedIndex(index);
                            setMouseEnter(true);
                          }}
                          onMouseEnter={() => setMouseEnter(false)}
                          onMouseLeave={() => setMouseEnter(true)}
                          _hover={{
                            backgroundColor:
                              colorMode === "dark"
                                ? backgroundColorForQuerieForHoverForDarkTheme
                                : backgroundColorForQueriyForHoverForLightTheme,
                            color: colorMode === "dark" ? "#fff" : "#000",
                          }}>

                          <HStack key={query.id} height={{
                            lg: 10, xl: 7
                          }} width={"100%"}>
                            <FiMessageSquare size={15} />
                            <Text
                              letterSpacing={0.5}
                              fontSize={{ md: "sm", lg: "sm" }}
                              color={
                                colorMode === 'dark' ? 'gray.300' : 'gray.700'
                              }
                            >
                              {query.query} ...
                            </Text>
                          </HStack>

                          <Box
                            px={1.5}
                            py={1.5}
                            borderRadius="50%"
                            cursor="pointer"
                            _hover={{
                              backgroundColor:
                                colorMode === "dark"
                                  ? backgroundColorForQueryOptionForHoverForDarkTheme
                                  : backgroundColorForQueryOptionForHoverForLightTheme,
                            }}
                          >
                            {!mouseEnter && <SlOptionsVertical size={15} />}
                          </Box>
                        </HStack>
                      ))}
                    </Box>
                  </VStack>
                </Show>
              )}
            </Box>
          </VStack>

          {/* Bottom Section */}
          <Box
            className="Bottom"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="start"
            fontSize={{ md: "sm", lg: "sm" }}
            letterSpacing={0.5}
            gap={1}
            mt="auto"
            w="100%"
          >
            {handlers.map((handler) => (
              <HStack
                key={handler.id}
                py={2}
                px={isCollapsed ? 1 : 3}
                borderRadius={20}
                width={"100%"}
                cursor="pointer"
                _hover={{
                  backgroundColor:
                    colorMode === "dark"
                      ? backgroundColorForQuerieForHoverForDarkTheme
                      : backgroundColorForQueriyForHoverForLightTheme,
                }}
                height={10}
                justifyContent={isCollapsed ? "center" : "flex-start"}
              >
                <Icon as={handler.icon} w={5} h={5} />
                <Show above="lg">
                  {!isCollapsed && <Text>{handler.title}</Text>}
                </Show>
              </HStack>
            ))}
          </Box>
        </Box>
      </Show>
    </>
  );
};

export default Sidebar;
