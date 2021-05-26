import { useColorMode } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Box, Grid, Text } from "@chakra-ui/layout";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer(props) {
  const { colorMode } = useColorMode();
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      }}
      w="100%"
      p="10"
      bg={colorMode === "light" ? "#F6F6F6" : "#212733"}
    >
      <Box mt="4">
        Company
        <br />
        <Text fontSize="sm">
          About Us
          <br />
          Become a Vendor
        </Text>
      </Box>
      <Box mt="4">
        Help
        <br />
        <Text fontSize="sm">
          Contact Us
          <br /> Track My Order
        </Text>
      </Box>
      <Box mt="4">
        Policy
        <br />
        <Text fontSize="sm">
          Privacy
          <br /> Terms of Use
          <br /> Disclaimer <br />
          Cancellation
        </Text>
      </Box>
      <Box mt="4">
        Follow <br />
        <Icon w={6} h={6} m="1" as={FaFacebook} />
        <Icon w={6} h={6} m="1" as={FaInstagram} />
        <Icon w={6} h={6} m="1" as={FaTwitter} />
      </Box>
    </Grid>
  );
}

export default Footer;
