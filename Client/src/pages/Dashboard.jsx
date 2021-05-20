import { Button, Box, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const { setLoginFalse } = useContext(UserContext);
  return (
    <Box mh="100vh" justifyContent="center">
      <ColorModeSwitcher />
      <Button
        onClick={() => {
          setLoginFalse();
        }}
        rightIcon={<Icon as={FaSignOutAlt} />}
        colorScheme="teal"
        variant="outline"
      >
        LogOut
      </Button>
    </Box>
  );
}

export default Dashboard;
