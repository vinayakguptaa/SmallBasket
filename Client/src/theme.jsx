import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Link: {
      baseStyle: {
        "&:hover": {
          textDecoration: "none",
        },
        "&:focus": {
          boxShadow: "none",
        },
      },
    },
  },
  styles: {
    global: {
      ".gradient-text": {
        background:
          "-webkit-linear-gradient(270deg, #65bbf1 40%,   #1280c4 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".nav": {
        padding: 1,
        boxShadow:
          "0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)",
      },
      ".heroImgs": {
        position: "absolute",
        transition: "transform 0.4s ",
        "&:hover": {
          transform: "scale(1.1)",
        },
      },
      ".hide": {
        display: "none",
      },
    },
  },
});

export default theme;
