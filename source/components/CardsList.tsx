import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withDecay,
  clamp,
  withClamp,
} from "react-native-reanimated";
import { cancelAnimation } from "react-native-reanimated";
import Card from "./Card";
const cards = [
  require("../../assets/cards/Card 1.png"),
  require("../../assets/cards/Card 2.png"),
  require("../../assets/cards/Card 3.png"),
  require("../../assets/cards/Card 4.png"),
  require("../../assets/cards/Card 5.png"),
  require("../../assets/cards/Card 6.png"),
  require("../../assets/cards/Card 7.png"),
  require("../../assets/cards/Card 8.png"),
  require("../../assets/cards/Card 9.png"),
];

const CardsList = () => {
  const [listHeight, setListHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();
  const scrollY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      cancelAnimation(scrollY);
    })
    .onStart(() => {
      console.log("on Starting");
    })
    .onChange((event) => {
      scrollY.value = clamp(scrollY.value - event.changeY, 0, listHeight - screenHeight);
    })
    .onEnd((event) => {
      scrollY.value = withClamp(
        { min: 0, max: listHeight - screenHeight},
        withDecay({ velocity: -event.velocityY })
      );
    });

  return (
    <GestureDetector gesture={pan}>
      <View
        style={{ padding: 10 }}
        onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
      >
        {cards.map((card, index) => (
          <Card key={index} card={card} index={index} scrollY={scrollY} />
        ))}
      </View>
    </GestureDetector>
  );
};

export default CardsList;

const styles = StyleSheet.create({});
