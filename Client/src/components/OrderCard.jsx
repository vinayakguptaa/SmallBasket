import React, { useContext } from "react";
import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Image,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { setStatus as setStatusAPI } from "../api/order";
import { UserContext } from "../context/UserContext";

function OrderCard({ item, getData }) {
  const { colorMode } = useColorMode();
  const { token } = useContext(UserContext);

  const cancelOrder = () => {
    setStatusAPI(token, item._id, 3).then((res) => {
      getData();
    });
  };

  const getStatus = (statusCode) => {
    switch (statusCode) {
      case 0:
        return (
          <chakra.span sx={{ color: "green.200" }}>Order Placed</chakra.span>
        );
      case 1:
        return (
          <chakra.span sx={{ color: "green.300" }}>
            Order Dispatched
          </chakra.span>
        );
      case 2:
        return (
          <chakra.span sx={{ color: "gray.500" }}>Order Delivered</chakra.span>
        );
      case 3:
        return (
          <chakra.span sx={{ color: "red.500" }}>Order Cancelled</chakra.span>
        );
      default:
        break;
    }
  };

  return (
    <Box
      w="100%"
      borderWidth="0px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      d="flex"
      flexWrap="wrap"
      mt="3"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
    >
      <Box w={["100%", "33%"]}>
        <AspectRatio w="100%" ratio={4 / 3}>
          <Image
            src={item.product.image}
            alt={item.product.name}
            objectFit="cover"
          />
        </AspectRatio>
      </Box>
      <Box p="3" w={["100%", "67%"]}>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Link to={`/product/${item.product._id}`} as={RouterLink}>
            {item.product.name} x{item.quantity}
          </Link>
          <br />
          {getStatus(item.status)}
          <br />
          Ordered: {dayjs(item.created_at).format("DD MMM YYYY")}
          <br />
          {item.status === 0 || item.status === 1 ? (
            <Button
              size="md"
              fontSize="lg"
              aria-label={`Cancel`}
              variant="filled"
              bg="red"
              color="white"
              mt="1"
              onClick={cancelOrder}
            >
              Cancel Order
            </Button>
          ) : item.status === 2 ? (
            <>
              {/* <Button
                size="md"
                fontSize="lg"
                aria-label={`Cancel`}
                variant="filled"
                bg="red.300"
                color="white"
                mt="1"
                onClick={returnOrder}
              >
                Return
              </Button> */}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderCard;
