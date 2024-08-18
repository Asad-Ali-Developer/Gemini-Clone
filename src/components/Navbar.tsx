import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <>

            <HStack
                width='100%'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                py={5} px={5}>

                <Text fontSize={{ lg : 'larger', md : 'medium', xl : 'larger' }}>Gemini</Text>

                <HStack
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    gap={5}>
                    <FaUserCircle size={25} />

                    {/* Color Mode Switch */}
                    <Switch
                        size="sm"
                        colorScheme="green"
                        isChecked={colorMode === "dark"}
                        onChange={toggleColorMode}
                    />
                </HStack>
            </HStack>

        </>
    )
}

export default Navbar;
