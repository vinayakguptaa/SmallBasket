import React, { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  useColorMode,
  Link,
  Button,
} from "@chakra-ui/react";
import hero from "../assets/heroBg.png";
import heroD from "../assets/heroBgDark.png";
import hero1 from "../assets/heroImage1.png";
import hero2 from "../assets/heroImage2.png";
import hero3 from "../assets/heroImage3.png";
import hero4 from "../assets/heroImage4.png";
import hero5 from "../assets/heroImage5.png";
import hero6 from "../assets/heroImage6.png";
import { UserContext } from "../context/UserContext";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  hero: {
    background: `url(${hero}) no-repeat right 50px`,
    backgroundSize: "280px",
    padding: 0,
    marginBottom: "6vh",
    minHeight: "70vh",
  },
  heroD: {
    background: `url(${heroD}) no-repeat right 50px`,
    backgroundSize: "280px",
    padding: 0,
    marginBottom: "6vh",
    minHeight: "70vh",
  },
  heroImgs: {
    position: "absolute",
    transition: "transform 0.4s ",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
};

function Hero(props) {
  const { colorMode } = useColorMode();
  const { isAdmin } = useContext(UserContext);

  return (
    <Flex
      sx={colorMode === "light" ? styles.hero : styles.heroD}
      direction="row"
      w="100%"
      wrap="wrap"
    >
      <Box
        sx={{
          position: "relative",
          width: { base: "100%", lg: "40%", xl: "30%" },
          padding: 2,
        }}
      >
        <Flex direction="column" justify="center" h="100%">
          <Heading as="h1" size="4xl" color="secondary">
            BUY
          </Heading>
          <Heading as="h1" size="4xl" color="secondary">
            AUTHENTIC
          </Heading>
          <br />
          <Heading as="h5" size="sm" color="secondary">
            Get honest reviews on wide range of products, so you always buy the
            best.
          </Heading>
          {isAdmin ? (
            <Link
              as={RouterLink}
              to="/product"
              mt="4"
              sx={{ width: "fit-content" }}
            >
              <Button>Vendor Page</Button>
            </Link>
          ) : (
            <></>
          )}
        </Flex>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: { base: "0%", lg: "60%", xl: "70%" },
        }}
      >
        <div className="heroImgs" style={{ zIndex: 100, top: 20, left: "2%" }}>
          <img
            src={hero1}
            loading="lazy"
            alt="hero image1"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className="heroImgs"
          style={{ zIndex: 300, top: 100, left: "30%" }}
        >
          <img
            src={hero2}
            loading="lazy"
            alt="hero image2"
            width="100%"
            height="100%"
          />
        </div>
        <div className="heroImgs" style={{ zIndex: 200, top: 12, right: "5%" }}>
          <img src={hero3} alt="hero image3" width="100%" height="100%" />
        </div>
        <div
          className="heroImgs"
          style={{ zIndex: 400, top: 250, left: "16%" }}
        >
          <img
            src={hero4}
            loading="lazy"
            alt="hero image4"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className="heroImgs"
          style={{ zIndex: 600, top: 350, left: "38%" }}
        >
          <img
            src={hero5}
            loading="lazy"
            alt="hero image5"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className="heroImgs"
          style={{ zIndex: 500, top: 210, right: "11%" }}
        >
          <img
            src={hero6}
            loading="lazy"
            alt="hero image6"
            width="100%"
            height="100%"
          />
        </div>
      </Box>
    </Flex>
  );
}

export default Hero;
