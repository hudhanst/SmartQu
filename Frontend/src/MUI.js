import { createMuiTheme } from '@material-ui/core'

export const MUI_Initial_State = {
    units: {
        minWidth_first: 980
    }
}

export const LightTheme = createMuiTheme({
    palette: {
        type: 'light',

        background: {
            paper: '#ffffff',
            default: '#eeeeee'
        },

        primary: {
            main: '#3f51b5',
            // main: '#3b5249',
            // contrastText: '#ffffff',
        },

        secondary: {
            main: '#f50057',
            // main: '#f50057',
            // contrastText: '#ffffff',
        },

        // text: {
        //     // primary: 'rgba(0, 0, 0, 0.87)',
        //     // secondary: 'rgba(0, 0, 0, 0.54)',
        // },
    },

    custom: {
        // navbar: '#382933',
    },
})

export const DarkTheme = createMuiTheme({
    palette: {
        type: 'dark',

        background: {
            paper: '#424242',
            default: '#313131'
        },

        primary: {
            main: '#3f51b5',
            // main: '#222222',
            // contrastText: '#ffffff',
        },

        secondary: {
            main: '#f50057',
            // main: '#c51162',
            // contrastText: '#ffffff',
        },

        // text: {
        //     // primary: '#ffffff',
        //     // secondary: 'rgba(255, 255, 255, 0.7)',
        // },
    },
    custom: {
        // navbar: '#000000',
    },
})

export const MUI_FullWidth = ({
    width: '100%',
})

export const MUI_HalfWidth = ({
    width: '40%',
})

export const MUI_VerticalMargin = ({
    marginTop: '1.5vh',
    marginBottom: '1.5vh',
})

export const MUI_HorizontalMargin = ({
    marginLeft: '1.5vw',
    marginRight: '1.5vw',
})