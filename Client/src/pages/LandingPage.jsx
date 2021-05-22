import { VStack } from "@chakra-ui/react";
import React from "react";
import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";
import ShopSection from "../components/ShopSection";

function LandingPage() {
  return (
    <VStack spacing={0}>
      <LandingNav />
      <Hero/>
      <ShopSection />
    </VStack>
  );
}

export default LandingPage;
