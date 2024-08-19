import { Box, Card, HStack, Icon, Image, Input, InputGroup, Text, useColorMode } from "@chakra-ui/react";
import Navbar from "../Navbar";
import { RiLightbulbLine } from "react-icons/ri";
import { FaRegCompass } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import { darkThemeForCardIcon, lightTheme } from "../../theme";
import { motion } from "framer-motion";
import '../../index.css';
import { FiMic } from "react-icons/fi";
import { VscSend } from "react-icons/vsc";
import { useContext } from "react";
import Context from "../../context/Context";
import { FaUserCircle } from "react-icons/fa";
import Gemini from '../../assets/images/gemini.png';
import { Typewriter } from "react-simple-typewriter";
import ReactMarkdown from "react-markdown";

const Main = () => {
  const { colorMode } = useColorMode();

  const context = useContext(Context);

  // Ensure context is defined before using it
  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { onSent, input, setInput, resultData, recentPrompt, loading } = context;

  const Cards = [
    { text: 'Teach me the concept of game theory in simple terms', icon: RiLightbulbLine },
    { text: 'Help me incorporate more plant-based options in my diet', icon: FaRegCompass },
    { text: 'Generate unit tests for the following C# function', icon: IoCodeSharp },
    { text: 'Briefly summarize this concept: urban planning', icon: RiLightbulbLine },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <Box className="mainContainer" h="auto" m={2} display="flex" justifyContent={"center"}>
        <Box>
          {!resultData ? (
            <Box>
              <Box>
                <Text
                  marginTop={{ md: 4, lg: 10, base: 1 }}
                  fontSize={{ lg: 44, base: 32 }}
                  className="dev-name"
                  fontWeight="medium"
                >
                  Hello, Asad
                </Text>

                <Text
                  fontSize={{ md: 44, lg: 52, base: 32 }}
                  fontWeight="medium"
                  color={colorMode === "dark" ? '#444746' : '#6c6c6c'}
                >
                  How can I help you today?
                </Text>
              </Box>

              <Box mt={{ md: 4, lg: 5, base: 2 }}>
                <Box
                  gap={2}
                  display="flex"
                  flexDirection={{ md: 'column', lg: 'row', base: 'column' }}
                  as={motion.div}
                  overflowX="scroll"
                  alignItems="center."
                  transition="0.3s ease"
                  className="Cards-Container"
                >
                  {Cards.map((card, index) => (
                    <Card
                      p={5}
                      w={{ md: '100%', lg: 44, base: '100%' }}
                      h={{ md: 24, lg: 48, base: '90px' }}
                      key={index}
                      cursor="pointer"
                      position="relative"
                      transition="0.3s ease"
                      borderRadius={10}
                      _hover={{
                        backgroundColor: colorMode === 'dark' ? '#282a2c' : 'gray.50',
                      }}
                    >
                      <Text fontSize={{ md: 'sm', lg: 'md', base: 'sm' }}>{card.text}</Text>

                      <Box
                        py={2}
                        px={2}
                        right={2}
                        bottom={2}
                        display="flex"
                        borderRadius="50%"
                        position="absolute"
                        alignItems="center"
                        justifyContent="center"
                        bg={colorMode === "dark" ? darkThemeForCardIcon : lightTheme}
                      >
                        <Icon as={card.icon} w={5} h={5} />
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>

          ) : (

            <Box
              maxW='60vw'
              className="result"
              marginInline="auto"
              mx={{ lg: 10, xl: 10 }}
              maxWidth={{ md: '80%', lg: '800px', base: '90%' }}>

              <HStack
                mx={2}
                gap={5}
                w={{ base : '100%', md : '100%', lg : '80%', xl : '80%' }}
                display="flex"
                alignItems="center">
                <Icon w={8} h={8} as={FaUserCircle} />
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>{recentPrompt}</Text>
              </HStack>

              <Box
                mt={{ md: 6, lg: 6, base: 5 }}
                w="100%"
                display="flex"
                flexDirection="column"
                justifyContent="left"
                gap={3}
              >
                <Image src={Gemini} w={8} h={8} ml={2} />
                {loading ? (
                  <Box>
                    <hr />
                    <hr />
                    <hr />
                  </Box>
                ) : (
                  <Box

                    // textAlign="left"
                    textAlign='justify'
                    // maxW='30vw'
                    maxHeight={{ md: '55vh', lg: '64vh', base: '60vh' }}
                    overflowY="scroll"
                    className="result-text"
                    fontSize={{ md: 16, lg: 18, base: 14 }}>
                    {/* <ReactMarkdown>{resultData}</ReactMarkdown> */}
                    <Typewriter
                      words={[resultData]}
                      loop={1}
                      // cursor
                      typeSpeed={20}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Box position="absolute" mx={1} bottom="2%">
          <InputGroup>
            <Input
              pr={20}
              value={input}
              variant="filled"
              borderRadius={40}
              position="relative"
              fontSize={{ lg: 20, base: 16 }}
              py={{ sm: 6, md: 6, lg: 8, base: 6 }}
              px={{ md: 6, lg: 8, xl: 8, base: 4 }}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a prompt here ..."
            />

            <Box
              p={{ md: 2, lg: 3, base: 2 }}
              top={{ md: 2, lg: 2.5, base: 2 }}
              right={{ md: 2, lg: 4, base: 2 }}
              display="flex"
              borderRadius="50%"
              position="absolute"
              alignItems="center"
              onClick={() => onSent(input)}
              justifyContent="center"
              _hover={{
                backgroundColor: colorMode === 'dark' ? '#282a2c' : 'gray.50',
              }}
            >
              <VscSend size={20} />
            </Box>

            <Box
              p={{ md: 2, lg: 3, base: 2 }}
              top={{ md: 2, lg: 2.5, base: 2 }}
              right={{ md: 16, lg: 16, base: 12 }}
              display="flex"
              borderRadius="50%"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              _hover={{
                backgroundColor: colorMode === 'dark' ? '#282a2c' : 'gray.50',
              }}
            >
              <FiMic size={20} />
            </Box>
          </InputGroup>

          <Text
            px={1}
            mt={2}
            fontSize={{ lg: 'sm', base: 10 }}
            textAlign="center"
            className="bottom-info"
            color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
          >
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Main;
