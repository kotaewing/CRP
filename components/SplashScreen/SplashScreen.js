import React from "react";
import { HStack, Spinner, Heading } from "native-base";

const SplashScreen = () => {
    return <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading fontSize="md">
          Loading
        </Heading>
      </HStack>;
  };

export default SplashScreen;