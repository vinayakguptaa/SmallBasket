import React, { useContext, useEffect, useState } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { delCart } from "../api/cart";

function ProductCart({ item }) {
  const [qty, setQty] = useState(item.quantity);
  const { token } = useContext(UserContext);

  const delItem = () => {
    delCart(item.product._id, token).then((res) => {
      if (res !== 0) {
      }
    });
  };

  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      d="flex"
      flexWrap="wrap"
      overflow="hidden"
      mt="4"
    >
      <Box w={["100%", "50%", "33%"]}>
        <AspectRatio w="100%" ratio={4 / 3}>
          <Link to={`/product/${item.product._id}`} as={RouterLink}>
            <Image
              src={item.product.image}
              alt={item.product.name}
              objectFit="cover"
            />
          </Link>
        </AspectRatio>
      </Box>
      <Box p="3" w={["100%", "50%", "67%"]}>
        <Heading className="gradient-text">{item.product.name}</Heading>
        <Heading size="md">
          ₹ {item.product.price} x {item.quantity} ={" "}
          <span className="gradient-text">
            ₹ {item.product.price * item.quantity}
          </span>
        </Heading>
        <Flex wrap="wrap">
          <InputGroup maxW="250" minW="210px" mt="3">
            <InputLeftElement
              width="5.5rem"
              fontSize="1.2em"
              fontWeight="semibold"
              children="Quantity: "
              sx={{ paddingLeft: "0.5rem" }}
            />
            <Input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              type="number"
              min={0}
              sx={{ padding: "0 6rem" }}
            />
            <InputRightElement width="5.5rem">
              <Button h="1.75rem" size="sm" sx={{ paddingRight: "0.5rem" }}>
                Update
              </Button>
            </InputRightElement>
          </InputGroup>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Delete`}
            variant="filled"
            bg="red"
            color="white"
            mt="3"
            ml="3"
            onClick={() => {}}
            icon={<AiFillDelete />}
          />
        </Flex>
      </Box>
    </Box>
  );
}

export default ProductCart;
