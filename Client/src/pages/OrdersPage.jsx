import { Box, Heading, Icon, VStack } from "@chakra-ui/react";
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
        <Box w="100%" maxW="600px" p={[4, 3, 2]}>
          {items.length === 0 ? (
            <></>
          ) : (
            <>
              <Heading textAlign="center">Order History</Heading>
              {items.map((item) => (
                <>
                  <OrderCard item={item} getData={getData} />
                </>
              ))}
            </>
          )}
        </Box>
      )}
    </VStack>
  );
}

export default OrderPage;
