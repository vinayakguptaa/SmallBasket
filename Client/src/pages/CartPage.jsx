import { Box, Grid, useToast, VStack } from "@chakra-ui/react";
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
    getData(token);
    // eslint-disable-next-line
  }, [token]);

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
        <Box>
          {items.length === 0 ? (
            <></>
          ) : (
            <>
              {items.map((item) => (
                <>
                  <ProductCart item={item.product} />
                  <ProductCart item={item.product} />
                  <ProductCart item={item.product} />
                  <ProductCart item={item.product} />
                </>
              ))}
            </>
          )}
        </Box>
      </Grid>
    </VStack>
  );
}

export default CartPage;
