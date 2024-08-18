import { extendTheme, ThemeConfig } from "@chakra-ui/react";

export const darkTheme = '#202020';
export const lightTheme = '#ededed';

export const darkThemeForNewChat = '#282a2c'
export const lightThemeForNewChat = '#d3d3d3'

export const backgroundColorForQuerieForHoverForDarkTheme = '#282a2c'
export const backgroundColorForQueriyForHoverForLightTheme = '#d3d3d3'

export const backgroundColorForQueryOptionForHoverForLightTheme = '#ededed';
export const backgroundColorForQueryOptionForHoverForDarkTheme = '#424648';

export const darkThemeForCardIcon = '#121212'

const config : ThemeConfig = {
    initialColorMode : 'dark'
}

const theme = extendTheme({
    config,
    colors : {
        gray : {
            50 : '#f9f9f9',
            100 : lightTheme,
            200 : '#d3d3d3',
            300 : '#b3b3b3',
            400 : '#a0a0a0',
            500 : '#898989',
            600 : '#6c6c6c',
            700 : darkTheme,
            800 : '#121212',
            900 : '#111'
        }
    }
})

export default theme;
