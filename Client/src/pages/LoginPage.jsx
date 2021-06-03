import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import logo from "../assets/logo.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login as loginAPI } from "../api/user";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router";

function LoginPage() {
  const { colorMode } = useColorMode();
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const history = useHistory();
  const { isLoggedIn } = useContext(UserContext);

  const login = (data) => {
    loginAPI(data).then((res) => {
      let result = res;
      console.log(result);
      if (result === 0) {
        toast({
          title: "There was an error!",
          description: "Please check your password and try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (result && result.token) {
        localStorage.setItem("token", result.token);
        history.push("/2fa");
      }
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <VStack spacing={0}>
      <LandingNav />
      <Center w="100%" minH="90vh">
        <Flex
          justify="space-evenly"
          direction="column"
          align="center"
          borderRadius="md"
          spacing={2}
          padding="2% 2%"
          bg={colorMode === "light" ? "gray.200" : "gray.700"}
          minW="300px"
          minH="400px"
        >
          <img src={logo} width="70" alt="Small Basket" />
          <Heading className="gradient-text">Login</Heading>
          <form onSubmit={handleSubmit(login)}>
            <Flex
              justify="space-evenly"
              direction="column"
              align="center"
              minH="200px"
            >
              <Input
                variant="filled"
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
              />
              <InputGroup>
                <Input
                  variant="filled"
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    size="sm"
                    fontSize="sm"
                    variant="ghost"
                    onClick={() => {
                      setShow(!show);
                    }}
                    icon={show ? <FaEyeSlash /> : <FaEye />}
                  />
                </InputRightElement>
              </InputGroup>
              <Button type="submit">
                <span className="gradient-text">Login</span>
              </Button>
            </Flex>
          </form>
        </Flex>
      </Center>
    </VStack>
  );
}

export default LoginPage;
