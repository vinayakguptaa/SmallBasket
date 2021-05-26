import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import { add as addAPI } from "../api/product";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router";

function AddProduct() {
  const { colorMode } = useColorMode();
  const { register, handleSubmit, setValue } = useForm();

  const [fileChosen, setFile] = useState("No file Chosen");
  const [imag, setImg] = useState(null);
  const toast = useToast();

  const history = useHistory();
  const { isLoggedIn, token, isAdmin } = useContext(UserContext);

  const signup = (data) => {
    addAPI(data, token).then((res) => {
      let result = res;
      console.log(result);
      if (result === 0) {
        toast({
          title: "There was an error!",
          description: "Product Not Uploaded!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (result) {
        toast({
          title: "Product Added Successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else if (!isAdmin) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAdmin]);

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
          minH="550px"
        >
          <Heading className="gradient-text">Add Product</Heading>
          {imag ? (
            <img src={imag} alt="Product Preview" width={"100px"} />
          ) : (
            <></>
          )}
          <form onSubmit={handleSubmit(signup)}>
            <Flex
              justify="space-evenly"
              direction="column"
              align="center"
              minH="280px"
            >
              <Input
                variant="filled"
                placeholder="Name"
                type="text"
                {...register("name", { required: true })}
              />
              <Input
                variant="filled"
                placeholder="Price"
                type="number"
                {...register("price", { required: true })}
              />
              <InputGroup>
                <Input
                  variant="filled"
                  value={fileChosen}
                  readOnly
                  sx={{ paddingLeft: "5rem" }}
                />
                <InputLeftElement width="4.5rem">
                  <Button h="1.75rem" size="sm">
                    <label htmlFor="file-upload">Image</label>
                  </Button>
                </InputLeftElement>
              </InputGroup>
              <Input
                id="file-upload"
                variant="filled"
                placeholder="Image"
                type="file"
                {...register("image", { required: true })}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0].name);
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = (e) => {
                      setImg(e.target.result);
                    };
                  } else {
                    setFile("No file Chosen");
                    setImg(null);
                  }
                  setValue("image", e.target.files);
                }}
                sx={{ display: "none" }}
              />
              <Button type="submit">
                <span className="gradient-text">Add</span>
              </Button>
            </Flex>
          </form>
        </Flex>
      </Center>
    </VStack>
  );
}

export default AddProduct;
