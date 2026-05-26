import { StyleSheet } from 'react-native';
import BaseView from '../../components/BaseView';
import { useTheme } from '@react-navigation/native';
import TopTabBar, { TopTab } from './components/TopTabBar';
import { useState } from 'react';
import ComediansScreen from './tabs/Comedians';
import ClipsScreen from './tabs/Clips';
import GreatestHitsScreen from './tabs/GreatestHits';

function TopScreen() {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TopTab>('comedians');

  const handleTabPress = (tab: TopTab) => {
    setSelectedTab(tab);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'comedians':
        return <ComediansScreen />;
      case 'clips':
        return <ClipsScreen />;
      case 'greatestHits':
        return <GreatestHitsScreen />;
      default:
        return null;
    }
  };

  return (
    <BaseView applyTopInset={false}>
      <TopTabBar selectedTab={selectedTab} onTabPress={handleTabPress} />
      {renderTabContent()}
    </BaseView>
  );
}

const styles = StyleSheet.create({
 
});

export default TopScreen;
