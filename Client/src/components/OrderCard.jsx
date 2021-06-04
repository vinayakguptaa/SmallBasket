import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function ProductCard({ item }) {
  const { colorMode } = useColorMode();

  const cancelOrder = () => {};

  const getStatus = (statusCode) => {
    switch (statusCode) {
      case 0:
        return <span>Order Placed</span>
      case 1:
        return <span>Order Dispatched</span>
      default:
        break;
    }
  };

  return (
    <Link
      to={`/product/${item.product._id}`}
      as={RouterLink}
      sx={{
        borderRadius: "lg",
        "&:focus": {
          transform: "scale(1.01)",
          boxShadow: "lg",
        },
        "&:hover": {
          transform: "scale(1.01)",
          textDecoration: "none",
        },
      }}
    >
      <Box
        maxW="sm"
        borderWidth="0px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
      >
        <AspectRatio w="100%" ratio={4 / 3}>
          <Image
            src={item.product.image}
            alt={item.product.name}
            objectFit="cover"
          />
        </AspectRatio>

        <Flex p="6" justify="space-between">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {item.product.name} x{item.quantity}
            <br />
            {getStatus(item.status)}
          </Box>
          {item.status === 0 || item.status === 1 ? (
            <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight">
              <Button
                size="md"
                fontSize="lg"
                aria-label={`Cancel`}
                variant="filled"
                bg="red"
                color="white"
                mt="3"
                ml="3"
                onClick={cancelOrder}
              >
                Cancel Order
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Link>
  );
}

export default ProductCard;
