import { VStack } from "@chakra-ui/react";
import React from "react";
import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";

function LandingPage() {
  return (
    <VStack spacing={0}>
      <LandingNav />
      <Hero/>
    </VStack>
  );
}

export default LandingPage;
