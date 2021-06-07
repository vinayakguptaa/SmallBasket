import { VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import LandingNav from "../components/LandingNav";
import { UserContext } from "../context/UserContext";
import AddProduct from "../components/AddProduct";
import PendingOrders from "../components/PendingOrders";

function Admin() {
  const history = useHistory();

  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else if (!isAdmin) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [isAdmin]);

  return (
    <VStack>
      <LandingNav />
      <Tabs w="100%">
        <TabList>
          <Tab>Pending Orders</Tab>
          <Tab>Add Product</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PendingOrders />
          </TabPanel>
          <TabPanel>
            <AddProduct />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default Admin;
