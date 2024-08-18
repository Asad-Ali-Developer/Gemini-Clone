
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme.ts'
import App from './App.tsx'
import './index.css'
import ContextProvider from './context/ContextProvider.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
    </ChakraProvider>
  </ContextProvider>,
)
