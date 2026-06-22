import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from '../screens/FeedScreen';
import { MapScreen } from '../screens/MapScreen';
import { CheckInScreen } from '../screens/CheckInScreen';
import { ActivityScreen } from '../screens/ActivityScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TabBar } from './TabBar';

export type RootTabParamList = {
  Feed: undefined;
  Map: undefined;
  CheckIn: undefined;
  Activity: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Five tabs matching the prototype's nav exactly: Feed, Map, the elevated
// center Spark button (CheckIn), Activity, and Profile ("You"). The custom
// TabBar component (not the default one) renders the actual bar — this
// just wires up the routes and screens behind it.
export function RootNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} options={{ title: 'Spark' }} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
