import React, { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { tempVideoSources } from "../../../../utils/tempVideoSorces";
import ReelVideoPlayer from "../../../components/ReelVideoPlayer";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SendTipBottomSheet from "../../../bottomSheets/SendTipBottomSheet";
import BuyCoinsBottomSheet from "../../../bottomSheets/BuyCoinsBottomSheet";

const ClipsScreen = () => {
  const { width, height } = useWindowDimensions();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const adjustedHeight = height - bottomTabBarHeight;
  const isScreenFocused = useIsFocused();
  const sendTipSheetRef = useRef<BottomSheetModal | null>(null);
  const buyCoinsSheetRef = useRef<BottomSheetModal | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const items = tempVideoSources;

  const handleMomentumScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.y / adjustedHeight);
      setActiveIndex(nextIndex);
    },
    [adjustedHeight],
  );
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const nextIndex = viewableItems[0]?.index;
      if (typeof nextIndex === "number") {
        setActiveIndex(nextIndex);
      }
    },
    [],
  );

  return (
    <View style={styles.clipsContainer}>
      <FlatList
        style={styles.list}
        data={items}
        extraData={activeIndex}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <ReelVideoPlayer
            item={item}
            width={width}
            height={adjustedHeight}
            isActive={index === activeIndex && isScreenFocused}
            onTipPress={() => sendTipSheetRef.current?.present()}
          />
        )}
        getItemLayout={(_, index) => ({
          length: adjustedHeight,
          offset: adjustedHeight * index,
          index,
        })}
        removeClippedSubviews={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={adjustedHeight}
        snapToAlignment="start"
        disableIntervalMomentum
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        showsVerticalScrollIndicator={false}
      />
      <SendTipBottomSheet sheetRef={sendTipSheetRef} buyCoinsSheetRef={buyCoinsSheetRef} />
      <BuyCoinsBottomSheet sheetRef={buyCoinsSheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  clipsContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
export default ClipsScreen;