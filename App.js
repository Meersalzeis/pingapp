/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  //DebugInstructions,
  Header,
  //LearnMoreLinks,
  //ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { MeasureComponent} from "./src/MeasureComponent";
import { styles } from "./src/styles";
//import Debug from "react-native/Libraries/Utilities/HMRClient";

const Separator = () => (
  <View style={styles.separator} />
);

const isDarkMode = true

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text style={[  styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black, },]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // added as global constant, true

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Separator />
          <Text>
            This is an app to measure rtt to different sites.
            Email to kaifrichter@gmail.com for more info.
          </Text>
          <Separator />
          <MeasureComponent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
