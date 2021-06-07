import Icon from "@chakra-ui/icon";
import { Box, Center, Heading } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { getPending } from "../api/order";
import { UserContext } from "../context/UserContext";
import OrderCardAdmin from "../components/OrderCardAdmin";

function PendingOrders(props) {
  const { token } = useContext(UserContext);
  const [items, setItem] = useState([]);

  const getData = () => {
    getPending(token).then((res) => {
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
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Center w="100%" minH="80vh">
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
            <Heading className="gradient-text">No Pending Orders</Heading>
          </Box>
        </Box>
      ) : (
        <Box w="100%" maxW="600px" p={[4, 3, 2]}>
          {items.length === 0 ? (
            <></>
          ) : (
            <>
              {items.map((item) => (
                <OrderCardAdmin item={item} key={item._id} getData={getData} />
              ))}
            </>
          )}
        </Box>
      )}
    </Center>
  );
}

export default PendingOrders;
