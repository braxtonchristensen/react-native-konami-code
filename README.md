# react-native-konami-code

cheat code listener by default we will use the classic konami code

## Installation

```sh
npm install react-native-konami-code
```

## Usage

```js
import { KonamiCode } from 'react-native-konami-code';
// or as default
import SuperImportantProvider from 'react-native-konami-code'; // 😉

// ...

<KonamiCode
  onPatternComplete={() => {
    setResult(true);
  }}
  onPatternFail={() => setResult(false)}
>
  {/* Your component content here */}
  <SafeAreaView>
      <Button
        title="Button"
        onPress={() => console.log('Button pressed')}
      />
  </SafeAreaView>
</KonamiCode>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
