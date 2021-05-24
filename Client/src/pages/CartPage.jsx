import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import { getCart } from "../api/cart";
import { useHistory, useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { useForm } from "react-hook-form";
import ProductCart from "../components/ProductCart";

function CartPage() {
  const { id } = useParams();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [items, setItem] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { isLoggedIn, token, email } = useContext(UserContext);
  const [reviewed, setReviewed] = useState(false);

  const getData = (token) => {
    getCart(token).then((res) => {
      let result = res;
      console.log(result);
      if (result === 0) {
        return;
      }
      if (result) {
        setItem(result.items);
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
    getData(token);
    // eslint-disable-next-line
  }, [token]);

  return (
    <VStack spacing={0}>
      <LandingNav />
      <Box w="100%" maxW="600px" p={[6, 4, 2]} pb="70px">
        {items.length === 0 ? (
          <></>
        ) : (
          <>
            {items.map((item) => (
              <>
                <ProductCart item={item} />
              </>
            ))}
          </>
        )}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          borderRadius: "8px 8px 0 0",
          "@media screen and (min-width: 600px)": {
            position: "relative !important",
            borderRadius: "lg",
          },
        }}
        h="60px"
        bg="blue.300"
        zIndex="10"
        width="100%"
        maxW="600px"
        d="flex"
        color="white"
      >
        <Box
          d="flex"
          justifyContent="center"
          alignItems="center"
          w="50%"
          fontSize="xl"
          fontWeight="bold"
        >
          Total: ₹ 1000
        </Box>
        <Button w="50%" h="100%" variant="ghost">
          Proceed to Checkout
        </Button>
      </Box>
    </VStack>
  );
}

export default CartPage;
