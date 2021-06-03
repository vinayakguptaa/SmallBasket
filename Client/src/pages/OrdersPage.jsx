import { Box, Button, Heading, Icon, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import { getAll } from "../api/order";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";
import ProductCart from "../components/ProductCart";
import { FiShoppingBag } from "react-icons/fi";

function OrderPage() {
  const [items, setItem] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const { token } = useContext(UserContext);

  const getData = () => {
    getAll(token).then((res) => {
      let result = res;
      console.log(result);
      // if (result === 0) {
        setItem([]);
        setTotal(0);
      //   return;
      // }
      // if (result) {
      //   setItem(result.items);
      //   setTotal(result.total);
      // }
    });
  };

  const order = () => {
    // placeOrder(token).then((res) => {
    //   getData();
    // })
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
    getData();
    // eslint-disable-next-line
  }, [token]);

  return (
    <VStack spacing={0}>
      <LandingNav />
      {items.length === 0 ? (
        <Box
          w="100%"
          h="80vh"
          d="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box textAlign="center">
            <Icon
              as={FiShoppingBag}
              boxSize="10em"
              viewBos="0 0 200 200"
              color="blue.400"
            />
            <br />
            <Heading className="gradient-text">No Orders</Heading>
          </Box>
        </Box>
      ) : (
        <>
          <Box w="100%" maxW="600px" p={[4, 3, 2]} pb="70px">
            {items.length === 0 ? (
              <></>
            ) : (
              <>
                {items.map((item) => (
                  <>
                    <ProductCart item={item} getData={getData} />
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
                marginTop: "10px !important",
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
            <Button
              w="100%"
              h="100%"
              colorScheme="blue.300"
              d="flex"
              justifyContent="space-around"
              onClick={order}
            >
              <span>Total: ₹ {total}</span>
              <span>Proceed to Checkout</span>
            </Button>
          </Box>
        </>
      )}
    </VStack>
  );
}

export default OrderPage;
