import React, { useEffect, useState } from "react";
import { Grid, Heading, Link } from "@chakra-ui/react";
import { getAll } from "../api/product";
import ProductCard from "./ProductCard";
import { Link as RouterLink } from "react-router-dom";

function ShopSection(props) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      console.log(res);
      if (res !== 0) setTrending(res);
    });
  }, []);

  return (
    <>
      <Heading>Trending Products</Heading>
      <Link as={RouterLink} to="/product">Product Page</Link>
      <Grid
        templateColumns={{
          base: "repeat(auto-fill, 320px)",
          md: "repeat(auto-fill, 380px)",
        }}
        gap={[3, 4, 5]}
        padding={"30px 5px"}
        justifyContent="space-evenly"
        w="100%"
      >
        {trending.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </Grid>
    </>
  );
}

export default ShopSection;
