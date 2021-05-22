import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  useToast,
  Icon,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import {
  addCart,
  addReview,
  delReview,
  getProduct as getProductAPI,
} from "../api/product";
import { useHistory, useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useForm } from "react-hook-form";

function ProductPage() {
  const { id } = useParams();
  const toast = useToast();

  const { register, handleSubmit } = useForm();

  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { isLoggedIn, token, email } = useContext(UserContext);
  const [reviewed, setReviewed] = useState(false);

  const getData = () => {
    getProductAPI(id).then((res) => {
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
        setItem(result);
        let found = false;
        for (let i = 0; i < result.reviews.length; i++) {
          if (result.reviews[i].author.email === email) {
            found = true;
          }
        }
        setReviewed(found);
      }
    });
  };

  const addToCart = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login to Continue!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      history.push("/login");
      return;
    }
    addCart({ productId: id }, token).then((res) => {
      toast({
        title: "Added to Cart!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const addRev = (data) => {
    if (!isLoggedIn) {
      toast({
        title: "Login to Continue!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      history.push("/login");
      return;
    }
    addReview({ stars: data.stars, text: data.text, id: id }, token).then(
      (res) => {
        toast({
          title: "Added Review!",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        getData();
        setOpen(false);
      }
    );
  };

  const delRev = () => {
    delReview({ productId: id }, token).then((res) => {
      toast({
        title: "Review Deleted!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      getData();
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <VStack spacing={0}>
      <LandingNav />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
        }}
        gap={[3, 4, 5]}
        padding={"30px 5px"}
        justifyContent="space-evenly"
        w="100%"
        maxW="1200px"
        minH="90vh"
      >
        <Box
          sx={{
            position: "sticky",
            height: "fit-content",
            top: 2,
            "@media screen and (max-width: 480px)": {
              position: "relative !important",
            },
          }}
        >
          <Image src={item?.image} alt={item?.name} objectFit="cover" />
        </Box>
        <Box>
          <Box borderWidth="1px" borderRadius="lg" padding={6}>
            <Heading isTruncated size="2xl">
              {item?.name}
            </Heading>
            <Heading pt={2} className="gradient-text" size="lg">
              Price: ₹{item?.price}
            </Heading>
            <Box pt={6} textAlign="end">
              <Button variant="solid" onClick={addToCart}>
                Add to Cart
              </Button>
            </Box>
          </Box>
          <Box h="10px"></Box>
          <Box borderWidth="1px" borderRadius="lg" padding={3}>
            <Flex justify="space-between">
              <Button
                variant="solid"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {reviewed ? "Edit Review" : "Add a Review"}
              </Button>
              {reviewed ? (
                <Button variant="solid" onClick={delRev}>
                  Delete Review
                </Button>
              ) : (
                <></>
              )}
            </Flex>
            {item.reviews ? (
              item.reviews.map((rev) => (
                <Box
                  pt="1"
                  borderBottom="1px"
                  borderColor="gray.100"
                  padding={3}
                >
                  <Text fontSize={16} fontWeight="bold">
                    {rev.author.name}(
                    <Text fontSize={14} display="inline">
                      {rev.author.email}
                    </Text>
                    )
                  </Text>
                  <Box d="flex" mt="-1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => {
                        if (i < rev.stars) {
                          return (
                            <Icon as={AiFillStar} key={i} color="#65bbf1" />
                          );
                        } else {
                          return (
                            <Icon as={AiOutlineStar} key={i} color="#65bbf1" />
                          );
                        }
                      })}
                  </Box>
                  <Text mt="2" fontSize={12}>
                    {rev.text}
                  </Text>
                </Box>
              ))
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Grid>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add/Edit Review</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <Input placeholder="Star Rating" {...register("stars")} />
            </FormControl>

            <FormControl mt={4}>
              <Textarea placeholder="Review" {...register("text")} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(addRev)}>
              Save
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default ProductPage;
