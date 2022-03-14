import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { categories, sources } from "../API/api";
import { NewsContext } from "../API/Context";
import Search from "../components/Search";

const DiscoverScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const { setCategory, setSource, darkTheme, categoryArray, news, setIndex, notificationArray } =
    useContext(NewsContext);

  return (
    <View style={styles.discover}>
      <Search />
      <ScrollView scrollEventThrottle={16}>
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Categories
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => {setCategory("general"); setIndex(1);}}
          style={styles.category}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/fluent/96/000000/news.png",
            }}
            style={styles.categoryImage}
          />
          <Text
            style={{ ...styles.name, color: darkTheme ? "white" : "black" }}
          >
            All News
          </Text>
        </TouchableOpacity>
        {categoryArray.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {setCategory(item._id); setIndex(1);}}
              style={styles.category}
              key={item._id}
            >
              <Image
                source={{ uri: item.imgLink }}
                style={styles.categoryImage}
              />
              <Text
                style={{
                  ...styles.name,
                  color: darkTheme ? "white" : "black",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
     </ScrollView>
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Latest Notification
      </Text>
      <View>
        {notificationArray.slice(0,5).map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s._id)}
            key={s._id}
            style={styles.sourceContainer}
          >
            <View style={{ paddingRight: 75,marginRight: 55, paddingLeft: 30}} >
              <Text
                style={{
                  ...styles.sourceText,
                  color: darkTheme ? "white" : "black",
                }}
              >
                {s.title}
              </Text>
            </View>
            <View style={{paddingRight: 35}}>
              <Image
                source={{ uri: `https://thebulletins-server.herokuapp.com/api/product/photo/${s._id}`}}
                style={styles.sourceImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  discover: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  category: {
    height: 130,
    margin: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categoryImage: {
    height: "60%",
    width: "180%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  notification: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  sourceContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 11,
    paddingBottom: 11,
    marginLeft: 8,
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  sourceText: {
    // fontWeight: "bold",
  },
  sourceImage: {
    height: 65,
    width: 65,
    borderRadius: 10,
    //resizeMode: "cover",
  },
});
