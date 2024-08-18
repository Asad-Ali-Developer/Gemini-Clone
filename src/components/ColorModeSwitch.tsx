import { HStack, Switch, useColorMode } from "@chakra-ui/react"

const ColorModeSwitch = () => {
    const { toggleColorMode, colorMode } = useColorMode()
    return (
        <div>
            <HStack ml={3} py={5}>
                <Switch
                    size='sm'
                    colorScheme='green'
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode} />
                    {/* <Text fontSize={{md : 'md', lg : 'md'}}>Dark Mode</Text> */}
            </HStack>
        </div>
    )
}

export default ColorModeSwitch
