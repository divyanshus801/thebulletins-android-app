import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { NewsContext } from "../API/Context";
import Lottie from "../components/LottieView";
import SingleNews from "../components/SingleNews";

const NewsScreen = () => {
  const { news, darkTheme, loading, setLoading } = useContext(NewsContext);

  //const windowHeight = Dimensions.get("window").height;

  //console.log("push",news && news[9]);
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: Dimensions.get("window").height - 37.1 }}>
        <SingleNews item={item} index={index} darkTheme={darkTheme} />
      </View>
    );
  };

  return loading ? (
    <Lottie />
  ) : (
    <View style={styles.carousel}>
      {news && (
        <FlatList
          data={news}
          pagingEnabled
          decelerationRate={"normal"}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    //transform: [{ scaleY: 1 }],
    backgroundColor: "black",
  },
});
