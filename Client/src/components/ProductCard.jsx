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

function ProductCard({ item }) {
  return (
    <Link to={`/product/${item._id}`} as={RouterLink}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        sx={styles.pro}
      >
        <AspectRatio w="100%" ratio={4 / 3}>
          <Image src={item.image} alt={item.name} objectFit="cover" />
        </AspectRatio>

        <Flex p="6" justify="space-between">
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
        </Flex>
      </Box>
    </Link>
  );
}

export default ProductCard;
