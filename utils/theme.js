import { extendTheme } from "native-base"
import { StyleSheet } from "react-native"

export const theme = extendTheme({
    colors: {

    },
    fontConfig: {
        fonts: {
            heading: 'Roboto',

        }
    }
})

export const classes = StyleSheet.create({
    card: {
        shadowColor: 'rgba(138, 149, 158, 0.2)',
        shadowOffset: {
            width: -3,
            height: 6
        },
        shadowRadius: 3,
        borderRadius: 15, 
        borderColor: 'transparent'
    },

    bodyText: {
        fontFamily: 'Rubik_400Regular'
    }
})