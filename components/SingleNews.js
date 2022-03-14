import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../API/Context";
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Share
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SingleNews = ({ item, index, darkTheme }) => {
  const imageToUrl = item
    ? `https://thebulletins-server.herokuapp.com/api/product/photo/${item._id}`
    : "http://www.aaru.edu.jo/websites/aaru2/wp-content/plugins/learnpress/assets/images/no-image.png?Mobile=1&Source=%2F%5Flayouts%2Fmobile%2Fdispform%2Easpx%3FList%3D78b536db%252De7c7%252D45d9%252Da661%252Ddb2a2aa2fbaf%26View%3D6efc759a%252D0646%252D433c%252Dab6e%252D2f027ffe0799%26RootFolder%3D%252Fwebsites%252Faaru2%252Fwp%252Dcontent%252Fplugins%252Flearnpress%252Fassets%252Fimages%26ID%3D4786%26CurrentPage%3D1";

    const [showModal, setShowModal] = useState(false);

    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            `Read Quick News and Save time. Download thebulletins,India's best news app  
             https://www.thebulletins.in/#${item._id}`,
          
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

  return (
    <View style={{ height: windowHeight,width: windowWidth}}  >
      <Image
        source={{ uri: imageToUrl }}
        style={{ height: "35%", resizeMode: "cover", width: windowWidth }}
      />
      <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)} 
        
      >
         <View style={{
          ...styles.description,
          backgroundColor: darkTheme ? "#282C35" : "white",
        }}>
        <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
          {item.title} 
        </Text>
        <Text
          style={{ ...styles.content, color: darkTheme ? "white" : "black" }}
        >
          {item.description}
        </Text>
        <Text style={{ fontSize: 11,color: darkTheme ? "white" : "black" }}>
          Short by
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {item.author.name ?? "unknown"}
          </Text>
        </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
      animationType={'slide'}
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      
      >  
       <View style={{flex: 1}}>
         <Pressable onPress={() => setShowModal(false)} style={{flex: 1}}>

         </Pressable>
        <View style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: darkTheme ? "#1c1e24" : "#dedede",
          height: 80,
          maxHieght: 80,

        }}>
         <TouchableOpacity onPress={() => onShare()} style={{
           alignSelf: 'center',
           justifyContent: 'center',
           color: darkTheme ? "white" : "black",
           fontSize: 10,
           fontWeight: '500',
           margin: 15
         }}><MaterialCommunityIcons
         name="share-variant"
         size={34}
         color="#007FFF"
       /></TouchableOpacity>
       </View>
       </View>
      </Modal>
      <ImageBackground
        blurRadius={30}
        style={styles.footer}
        source={{ uri: imageToUrl }}
      >
        
        <TouchableOpacity onPress={() => {Linking.openURL(item.link)}}>
          <Text style={{ fontSize: 15, color: "white" }}>
            '{item?.description?.slice(0, 45)}...'
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>
            Read More
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>

    
  );
};

export default SingleNews;

const styles = StyleSheet.create({
  description: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    paddingBottom: 10,
  },
  content: { 
    fontSize: 16,
    paddingBottom: 10,
    lineHeight: 28,
  },
  footer: {
    height: 117,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#d7be69",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  modal: {
    height: 80,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
