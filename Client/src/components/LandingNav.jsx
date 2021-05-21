import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/UserContext";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function LandingNav(props) {
  const { isLoggedIn, setLoginFalse } = useContext(UserContext);

  const history = useHistory();

  return (
    <Flex
      h="60px"
      w="100%"
      align="center"
      justify="space-between"
      className="nav"
    >
      <Flex>
        <Link to="/" as={RouterLink}>
          <HStack>
            <img src={logo} width="70" alt="Small Basket" />
            <Heading
              className="gradient-text"
              sx={{
                display: {
                  base: "none",
                  sm: "inline-block",
                },
              }}
              fontSize={{ base: "24px", lg: "36px" }}
            >
              Small Basket
            </Heading>
          </HStack>
        </Link>
      </Flex>
      <Flex>
        {isLoggedIn ? (
          <>
            <Button onClick={setLoginFalse}>
              <span className="gradient-text">Logout</span>
            </Button>
          </>
        ) : (
          <>
            {history.location.pathname === "/signup" ? (
              <></>
            ) : (
              <Link to="/signup" as={RouterLink}>
                <Button>
                  <span className="gradient-text">Create Account</span>
                </Button>
              </Link>
            )}
            <Box w="2"></Box>
            {history.location.pathname === "/login" ? (
              <></>
            ) : (
              <Link to="/login" as={RouterLink}>
                <Button
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  _active={{ bg: "gray.800" }}
                >
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </>
        )}
        <Box w="2"></Box>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export default LandingNav;
