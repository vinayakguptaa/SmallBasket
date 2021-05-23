import React from "react";
import { AspectRatio, Box, Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  pro: {
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
};

function ProductCart({ item }) {
  return (
    <Link to={`/product/${item._id}`} as={RouterLink}>
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        sx={styles.pro}
        d="flex"
        h="100px"
      >
        <AspectRatio w="100px" ratio={4 / 3}>
          <Image src={item.image} alt={item.name} objectFit="cover" />
        </AspectRatio>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {item.name}
        </Box>
        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight">
          ₹ {item.price}
        </Box>
      </Box>
    </Link>
  );
}

export default ProductCart;
