import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/layout";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function LandingNav(props) {
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
            <Heading className="gradient-text">Small Basket</Heading>
          </HStack>
        </Link>
      </Flex>
      <Flex>
        <Link to="/signup" as={RouterLink}>
          <Button>
            <span className="gradient-text">Create Account</span>
          </Button>
        </Link>
        <Box w="2"></Box>
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
        <Box w="2"></Box>
        <ColorModeSwitcher />
      </Flex>
    </Flex>
  );
}

export default LandingNav;
