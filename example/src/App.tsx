import * as React from 'react';

import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { KonamiCode } from 'react-native-konami-code';

const setBackgroundColor = (result: boolean | undefined) => {
  if (result === undefined) {
    return '#fff';
  } else if (result) {
    return '#0f0';
  } else {
    return '#f00';
  }
};

export default function App() {
  const [result, setResult] = React.useState<boolean | undefined>(undefined);

  // only change the background color to red for 3 seconds
  React.useEffect(() => {
    setTimeout(() => {
      setResult(undefined);
    }, 3000);
  }, [result]);

  return (
    <KonamiCode
      onPatternComplete={() => {
        setResult(true);
      }}
      onPatternFail={() => setResult(false)}
    >
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: setBackgroundColor(result),
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Result: {JSON.stringify(result)}</Text>
          {/* Your component content here */}
          <Button
            title="Button"
            onPress={() => console.log('Button pressed')}
          />
        </View>
      </SafeAreaView>
    </KonamiCode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
