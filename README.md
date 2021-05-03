# react-native-rnx

BerthX libs

Useful library package containing:
- tab & stack navigation Provider + hook
- translation hook
- store hook (using react context, can be automatically persisted in LocalStorage if specified to Provider)
- some UI components
- some helpers

## Installation

```sh
yarn add react-native-rnx
```

Also checkout the peerDependencies in package.json, it was tested only with these deps

## Usage

```js
// App.tsx
import {
  Router,
  initLocalization,
  useLocalization,
  createStateProvider,
} from 'react-native-rnx';

import en from '@localizations/en.json';
initLocalization({en});

import Routes from '@models/Routes';
import Home from '@screens/Home';
import Settings from '@screens/Settings';
import Feed from '@screens/Feed';
import NotificationsSettings from '@screens/NotificationsSettings';

interface GlobalState {
  username: string;
}

const App = () => {
  const {localize} = useLocalization();
  const [StateProvider] = useState(
    createStateProvider<GlobalState>({}, state => state, [
      'username', // If specied here, data will be persisted in local storage
    ]),
  );

  return (
    <StateProvider.Element>
      <Router
        tabs={{
          [Routes.Tab1]: {
            initial: Routes.Home,
            title: localize('tabs.1'),
            iconName: 'clock',
            screens: [
              {component: Home, name: Routes.Home},
            ],
          },
          [Routes.Tab2]: {
            initial: Routes.Explore,
            title: localize('tabs.2'),
            iconName: 'graduation-cap',
            screens: [
              {component: Feed, name: Routes.Feed},
            ],
          },
          [Routes.Tab3]: {
            initial: Routes.Settings,
            title: localize('tabs.3'),
            iconName: 'user',
            screens: [
              {component: Settings, name: Routes.Settings},
              {component: NotificationsSettings, name: Routes.NotificationsSettings},
            ],
          },
        }}
      />
    </StateProvider.Element>
  );
};

export default App;
```

How to use navigation hook
```js
import {useNavigation} from '@react-navigation/native';
import Routes from '@models/Routes';

const Component = () => {
  const {navigate, goBack} = useNavigation();
  const notif = {data: 1};
  
  const navigateToNotifSettingsScreen = () => {
    navigate(Routes.NotificationsSettings, {notif});
  }
  
   const goBackInStack = () => {
      goBack();
   }
}
export default Component;
```


How to use store hook
```js
import GlobalState from '@models/GlobalState';
import {useGlobalState} from 'react-native-rnx';

const Component = () => {
  const {globalState, setGlobalState} = useGlobalState<GlobalState>();
  const username = globalState.username;
  
  const updateUsername = (newVal: string) => {
    setGlobalState({username: newVal}); // This will be persist in localStorage because it was specifed in App.js
  }
}
export default Component;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
