import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { tempVideoSources } from "../../../../utils/tempVideoSorces";
import ReelVideoPlayer from "../../../components/ReelVideoPlayer";

const ClipsScreen = () => {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = tempVideoSources;

  const handleMomentumScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.y / height);
      setActiveIndex(nextIndex);
    },
    [height],
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
            height={height}
            isActive={index === activeIndex}
          />
        )}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        removeClippedSubviews={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        disableIntervalMomentum
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        showsVerticalScrollIndicator={false}
      />
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