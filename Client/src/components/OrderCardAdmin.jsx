import React, { useContext, useState } from "react";
import {
  AspectRatio,
  Box,
  Image,
  Link,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { setStatus as setStatusAPI } from "../api/order";
import { UserContext } from "../context/UserContext";

function ProductCard({ item, getData }) {
  const { colorMode } = useColorMode();
  const [status, setStatus] = useState(item.status);

  const { token } = useContext(UserContext);

  const updateStatus = (e) => {
    let oldVal = status;
    let newVal = e.target.value;
    setStatus(newVal);
    setStatusAPI(token, item._id, newVal).then((res) => {
      let result = res;
      if(result === 0) {
        setStatus(oldVal)
      }
    });
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
          Ordered: {dayjs(item.created_at).format("DD MMM YYYY")}
          <br />
          Ordered By: {item.user.name} ({item.user.address})
          <br />
          <Select value={status} onChange={updateStatus}>
            <option value={0}>Order Placed</option>
            <option value={1}>Order Dispatched</option>
            <option value={2}>Order Delivered</option>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
