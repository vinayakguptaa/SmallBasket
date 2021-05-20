import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Routes from "./Routes";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
