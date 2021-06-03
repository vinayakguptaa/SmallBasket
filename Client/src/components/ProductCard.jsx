import React from "react";
import { AspectRatio, Box, Flex, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link
      to={`/product/${item._id}`}
      as={RouterLink}
      sx={{
        borderRadius: "lg",
        "&:focus": {
          transform: "scale(1.01)",
          boxShadow:"lg"
        },
        "&:hover": {
          transform: "scale(1.01)",
          textDecoration: "none"
        },
      }}
    >
      <Box
        maxW="sm"
        borderWidth="0px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="sm"
        bg="whiteAlpha.50"
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
