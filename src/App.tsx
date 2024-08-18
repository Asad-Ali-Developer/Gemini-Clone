import { Box, HStack, Switch, useColorMode } from "@chakra-ui/react"
import Sidebar from "./components/Sidebar/Sidebar"
import Main from "./components/Main/Main"
// import ColorModeSwitch from "./components/ColorModeSwitch"
// import { darkTheme, lightTheme } from "./theme"

const App = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <>

      <Switch
        visibility='hidden'
        position='absolute'
        checked={colorMode === 'dark'}
        onChange={toggleColorMode}
      />

      <HStack flex={1} width={'100%'} height={'100%'} gap={0}>

        <Box className="Sidebar" height={'100%'}>
          <Sidebar />
        </Box>

        <Box className="Main" width={'100%'} height={'100vh'}>
          <Main />
        </Box>

      </HStack>
    </>
  )
}

export default App;
