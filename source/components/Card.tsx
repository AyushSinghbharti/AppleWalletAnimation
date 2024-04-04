import { useState } from "react";
import Animated, {
  clamp,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useWindowDimensions } from "react-native";

const Card = ({ card, index, scrollY, activeCardIndex }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useSharedValue(0);
  const { height: screenHeight } = useWindowDimensions();

  useAnimatedReaction(
    () => {
      return scrollY.value;
    },
    (current, previous) => {
      translateY.value = clamp(-current, -index * cardHeight, 0);
    }
  );

  useAnimatedReaction(
    () => {
      return activeCardIndex.value;
    },
    (current, previous) => {
      if (current === previous) return;
      console.log("active card changed", previous, current);

      //No card selected, move to list view
      if (activeCardIndex === null) {
        translateY.value = withTiming(
          (translateY.value = clamp(-scrollY.value, -index * cardHeight, 0))
        );
      } else if (activeCardIndex.value === index) {
        translateY.value = withTiming(-index * cardHeight, {
          duration: 3000,
          easing: Easing.out(Easing.bounce),
        });
      } else {
        translateY.value = withTiming(
          -index * cardHeight * 0.9 + screenHeight * 0.7
        );
      }
    }
    //This card become active

    //Another card is active, move to the bottom
  );

  const tap = Gesture.Tap().onEnd(() => {
    if (activeCardIndex.value === null) {
      activeCardIndex.value = index;
    } else {
      activeCardIndex.value = null;
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.Image
        source={card}
        onLayout={(event) =>
          setCardHeight(event.nativeEvent.layout.height + 10)
        }
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: 7 / 4,
          marginVertical: 5,

          transform: [
            {
              translateY: translateY,
            },
          ],
        }}
      />
    </GestureDetector>
  );
};

export default Card;
