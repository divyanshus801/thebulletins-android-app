import LottieView from "lottie-react-native";
import React, { useContext } from "react";
import { NewsContext } from "../API/Context";
import { Text, View } from "react-native";

const Lottie = () => {
  const { darkTheme } = useContext(NewsContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        
      }}
    >
      <LottieView
        style={{ height: 230, marginBottom: 60  }}
        source={require("../assets/28418-content-loading.json")}
        autoPlay
        loop
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "400",
          color: darkTheme ? "white" : "black",
        }}
      >
        Loading News...
      </Text>
    </View>
  );
};

export default Lottie;
