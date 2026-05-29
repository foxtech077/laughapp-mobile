import { FlatList, StyleSheet, View } from "react-native";
import ComedianRankCard, { ComedianRankItem } from "../components/ComedianRankCard";
import { useTheme } from "@react-navigation/native";
import { moderateScale } from "../../../../utils/dimensions";
import { spacing } from "../../../../utils/dimensions";
import { images } from "../../../../constants/images";

const MOCK_COMEDIAN_RANKS: ComedianRankItem[] = [
    {
      id: '1',
      name: 'Sarah Jeeper',
      avatar: images.sandeep,
      supportedCount: 4819,
      trendDirection: 'up',
      trendValue: 3,
      score: 2540,
      rank: 1,
    },
    {
      id: '2',
      name: 'Mark Chen',
      avatar: images.sandeep,
      supportedCount: 3871,
      trendDirection: 'up',
      trendValue: 2,
      score: 2532,
      rank: 2,
    },
    {
      id: '3',
      name: 'Linta Rixon',
      avatar: images.sandeep,
      supportedCount: 3617,
      trendDirection: 'down',
      trendValue: 8,
      score: 2530,
      rank: 3,
    },
    {
      id: '4',
      name: 'David Geller',
      avatar: images.sandeep,
      supportedCount: 2910,
      trendDirection: 'up',
      trendValue: 3,
      score: 2527,
      rank: 4,
    },
    {
      id: '5',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 5,
    },
    {
      id: '6',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 6,
    },
    {
      id: '7',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 7,
    },
    {
      id: '8',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 8,
    },
    {
      id: '9',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 9,
    },
    {
      id: '10',
      name: 'Nivin Pauly',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 10,
    },
    {
      id: '11',
      name: 'Nivin Pauly (You)',
      avatar: images.sandeep,
      supportedCount: 2678,
      trendDirection: 'down',
      trendValue: 10,
      score: 2522,
      rank: 11,
    },
  ];
  
const ComediansScreen = () => {
    const { colors } = useTheme();
   return (<>
    <View
    style={[
      styles.topComediansContainer,
      { backgroundColor: colors.cardBackground },
    ]}
  >
    <FlatList
      data={MOCK_COMEDIAN_RANKS}
      renderItem={({ item }) => <ComedianRankCard item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.comediansListContent}
      showsVerticalScrollIndicator={false}
    />
  </View>
  <View
    style={[
      styles.pinnedRankCardShadow,
      { shadowColor: colors.cardShadow },
    ]}
  >
    <ComedianRankCard
      item={MOCK_COMEDIAN_RANKS[MOCK_COMEDIAN_RANKS.length - 1]}
    />
  </View>
   </>)
}

const styles = StyleSheet.create({
    topComediansContainer: {
        flex: 1,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        marginTop: -spacing(25),
        width: '100%',
        zIndex: 2,
        paddingHorizontal: spacing(16),
        paddingTop: spacing(20),
      },
      comediansListContent: {
        paddingBottom: spacing(24),
      },
      pinnedRankCardShadow: {
        paddingHorizontal: spacing(16),
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        backgroundColor: 'white',
      },
})
export default ComediansScreen;