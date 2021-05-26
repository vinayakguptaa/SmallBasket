import { VStack } from "@chakra-ui/react";
import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";
import ShopSection from "../components/ShopSection";

function LandingPage() {
  return (
    <VStack spacing={0}>
      <LandingNav />
      <Hero/>
      <ShopSection />
      <Footer />
    </VStack>
  );
}

export default LandingPage;
