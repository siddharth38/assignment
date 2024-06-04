import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                margin: 0,
                fontFamily: "Montserrat",

                fontSize: "1.1rem",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
            },
            "*": {
                fontSize: "1.1rem",
                fontFamily: "Montserrat",
            },
        },
    },
    components: {
        FormLabel: {
            baseStyle: {
                display: "block",
                textAlign: "start",
                marginInlineEnd: 3,
                marginBottom: 2,
                transitionDuration: "normal",
                opacity: 1,
                fontWeight: 550,
                fontFamily: "Montserrat",
                fontSize: "1.1rem"
            },
        },
    },
});

export default theme;
