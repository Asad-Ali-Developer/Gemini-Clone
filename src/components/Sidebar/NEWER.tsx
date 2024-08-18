

import { useState } from "react";
import { Box, HStack, Icon, Text, useColorMode, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdMenu } from "react-icons/md";
import { FiPlus, FiMessageSquare } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineSettings, MdHistory } from "react-icons/md";
import { backgroundColorForQuerieForHoverForDarkTheme, backgroundColorForQueriyForHoverForLightTheme, backgroundColorForQueryOptionForHoverForDarkTheme, backgroundColorForQueryOptionForHoverForLightTheme, darkThemeForNewChat, lightThemeForNewChat } from "../../theme";
import ColorModeSwitch from "../ColorModeSwitch";

const Sidebar = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [mouseEnter, setMouseEnter] = useState('none');
    toggleColorMode

    const Queries = [
        { id: 1, query: 'What is React ...' },
        { id: 2, query: 'What is Kubernetes ...' },
        { id: 3, query: 'What is Next TS ...' },
    ];

    const handlers = [
        { id: 1, icon: IoIosHelpCircleOutline, title: 'Help' },
        { id: 2, icon: MdHistory, title: 'Activity' },
        { id: 3, icon: MdOutlineSettings, title: 'Settings' },
    ];

    return (
        <Box
            as={motion.div}
            width={isCollapsed ? '5vw' : '18vw'}
            transition="width 0.5s ease"
            bg={colorMode === 'dark' ? 'gray.800' : 'gray.100'}
            height="100vh"
            overflow="hidden"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <VStack
                display='flex'
                alignItems={isCollapsed ? 'center' : 'start'}
                ml={isCollapsed ? 0 : 7}
                mt={2}
                fontFamily='sans-serif'
            >
                <HStack ml={-3} display='flex' justifyContent={'center'} alignItems={'center'}>
                    <ColorModeSwitch />
                    {!isCollapsed && (
                        <Text fontSize={{ md: 'sm', lg: 'sm' }} fontWeight='bold'>
                            Dark Mode
                        </Text>
                    )}
                </HStack>

                <Box display='flex' flexDirection='column' alignItems={isCollapsed ? 'center' : 'start'}>
                    <MdMenu
                        size={25}
                        cursor={'pointer'}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />

                    <HStack
                        mt={10}
                        bg={colorMode === 'dark' ? darkThemeForNewChat : lightThemeForNewChat}
                        paddingLeft='5px'
                        paddingRight={isCollapsed ? '0' : '10px'}
                        py='3px'
                        px='3px'
                        cursor={'pointer'}
                        borderRadius='5px'
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <FiPlus size={20} />
                        {!isCollapsed && <Text fontSize={{ md: 'md', lg: 'md' }}>New Chat</Text>}
                    </HStack>

                    {!isCollapsed && (
                        <VStack
                            mt={10}
                            display='flex'
                            flexDir='column'
                            alignItems={isCollapsed ? 'center' : 'start'}
                            justifyContent='center'
                            gap={3}
                        >
                            <Text fontSize={{ md: 'sm', lg: 'sm' }} fontWeight='bold'>Recent</Text>

                            <Box display='flex' flexDir='column' gap={2}>
                                {Queries.map((Query, index) =>
                                    <HStack
                                        key={Query.id}
                                        display='flex'
                                        w='100%'
                                        alignItems='center'
                                        paddingY={1.5}
                                        cursor='pointer'
                                        paddingX={3}
                                        justifyContent={isCollapsed ? 'center' : 'space-between'}
                                        backgroundColor={(selectedIndex === index ? '#004a77' : '')}
                                        onClick={() => setSelectedIndex(index)}
                                        borderRadius={20}
                                        gap={3}
                                        _hover={{
                                            backgroundColor: colorMode === 'dark'
                                                ? backgroundColorForQuerieForHoverForDarkTheme
                                                : backgroundColorForQueriyForHoverForLightTheme
                                        }}
                                    >
                                        <HStack width={'100%'} justifyContent={isCollapsed ? 'center' : 'flex-start'}>
                                            <FiMessageSquare size={15} />
                                            <Text letterSpacing={0.5} fontSize={{ md: 'sm', lg: 'sm' }}>
                                                {Query.query}
                                            </Text>
                                        </HStack>

                                        {!isCollapsed && (
                                            <Box
                                                paddingX={1.5}
                                                paddingY={1.5}
                                                borderRadius='50%'
                                                cursor={'pointer'}
                                                _hover={{
                                                    backgroundColor: colorMode === 'dark'
                                                        ? backgroundColorForQueryOptionForHoverForDarkTheme
                                                        : backgroundColorForQueryOptionForHoverForLightTheme
                                                }}>
                                                <SlOptionsVertical
                                                    size={15}
                                                    visibility={mouseEnter === 'none' ? 'block' : 'none'}
                                                    onMouseEnter={() => setMouseEnter('block')}
                                                />
                                            </Box>
                                        )}
                                    </HStack>
                                )}
                            </Box>
                        </VStack>
                    )}
                </Box>
            </VStack>

            {/* BOTTOM SECTION */}
            <Box
                display='flex'
                flexDir='column'
                justifyContent='center'
                alignItems={isCollapsed ? 'center' : 'start'}
                fontSize={{ md: 'sm', lg: 'sm' }}
                letterSpacing={0.5}
                gap={3}
                mb={20}
            >
                {handlers.map(handler => (
                    <HStack
                        key={handler.id}
                        paddingY={2}
                        paddingX={isCollapsed ? '0' : '5'}
                        borderRadius={20}
                        width={'100%'}
                        cursor='pointer'
                        _hover={{
                            backgroundColor: colorMode === 'dark'
                                ? backgroundColorForQuerieForHoverForDarkTheme
                                : backgroundColorForQueriyForHoverForLightTheme
                        }}
                        height={7}
                        justifyContent={isCollapsed ? 'center' : 'flex-start'}
                    >
                        <Icon as={handler.icon} size={25} />
                        {!isCollapsed && <Text>{handler.title}</Text>}
                    </HStack>
                ))}
            </Box>
        </Box>
    );
}

export default Sidebar;
