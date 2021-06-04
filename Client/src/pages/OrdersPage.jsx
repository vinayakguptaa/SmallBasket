import { Box, Grid, Heading, Icon, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import LandingNav from "../components/LandingNav";
import { getAll } from "../api/order";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";
import OrderCard from "../components/OrderCard";
import { FiShoppingBag } from "react-icons/fi";

function OrderPage() {
  const [items, setItem] = useState([]);
  const history = useHistory();
  const { token } = useContext(UserContext);

  const getData = () => {
    getAll(token).then((res) => {
      let result = res;
      console.log(result);
      if (result === 0) {
        setItem([]);
        return;
      }
      if (result) {
        setItem(result);
      }
    });
  };

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
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, 320px)",
            md: "repeat(auto-fill, 380px)",
          }}
          gap={[3, 4, 5]}
          padding={"30px 5px"}
          justifyContent="space-evenly"
          w="100%"
          maxW="800px"
        >
          {items.length === 0 ? (
            <></>
          ) : (
            <>
              {items.map((item) => (
                <>
                  <OrderCard item={item} getData={getData} />
                </>
              ))}
            </>
          )}
        </Grid>
      )}
    </VStack>
  );
}

export default OrderPage;
