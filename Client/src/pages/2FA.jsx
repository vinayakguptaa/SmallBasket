import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import LandingNav from "../components/LandingNav";
import logo from "../assets/logo.svg";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router";

function TwoFA() {
  const { colorMode } = useColorMode();
  const { register, handleSubmit } = useForm();

  // const [show, setShow] = useState(false);
  const history = useHistory();
  const { setLoginTrue, isLoggedIn } = useContext(UserContext);

  const login = (data) => {
    setLoginTrue(localStorage.getItem("token"));
    history.go(-2);
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
          <Heading size="sm" className="gradient-text">OTP sent to your email</Heading>
          <form onSubmit={handleSubmit(login)}>
            <Flex
              justify="space-evenly"
              direction="column"
              align="center"
              minH="200px"
            >
              <Input
                variant="filled"
                placeholder="OTP"
                type="number"
                {...register("otp", { required: true })}
              />
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

export default TwoFA;
