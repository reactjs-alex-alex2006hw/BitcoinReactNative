import React from 'react';
import {
  Platform,
} from 'react-native';

// 3rd party libraries
import { Actions, Router, Scene } from 'react-native-router-flux';
import { AdMobInterstitial } from 'react-native-admob';
import DeviceInfo from 'react-native-device-info';
import GoogleAnalytics from 'react-native-google-analytics-bridge';

import TabIcon from './app/components/tab-icon';

// Views
import MainView from './app/views/main';
import MoreView from './app/views/more';
import AddView from './app/views/add';
import DetailsView from './app/views/details';
import NewsView from './app/views/news';

import I18n from './app/utils/i18n';
import { config } from './app/config';

AdMobInterstitial.setAdUnitID(config.admob[Platform.OS].interstital);
GoogleAnalytics.setTrackerId(config.googleAnalytics[Platform.OS]);

if (DeviceInfo.getDeviceName() === 'iPhone Simulator' || DeviceInfo.getManufacturer() === 'Genymotion') {
  AdMobInterstitial.setTestDeviceID('EMULATOR');
  GoogleAnalytics.setDryRun(true);
}

// @todo remove when RN upstream is fixed
console.ignoredYellowBox = [
  'Warning: In next release empty section headers will be rendered.',
  'Warning: setState(...): Can only update a mounted or mounting component.',
];

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="tabbar" tabs={true} >
      <Scene key="tab1" title={I18n.t('price')} icon={TabIcon} navigationBarStyle={{ backgroundColor: 'red' }} titleStyle={{ color: 'white' }} >
        <Scene key="main" title={I18n.t('main')} component={MainView} hideNavBar={true} />
        <Scene key="add" title={I18n.t('add')} component={AddView} hideNavBar={true} hideTabBar={true} direction="vertical" panHandlers={null} />
        <Scene key="details" title={I18n.t('details')} component={DetailsView} hideNavBar={true} hideTabBar={true} />
        <Scene key="more" title={I18n.t('more')} component={MoreView} hideNavBar={true} hideTabBar={true} direction="vertical" panHandlers={null} />
      </Scene>
      <Scene key="tab2" title={I18n.t('news')} icon={TabIcon}>
        <Scene key="news" title={I18n.t('news')} component={NewsView} hideNavBar={true} initial={true} />
      </Scene>
    </Scene>
  </Scene>
);

const Bitcoin = function Bitcoin() {
  return <Router scenes={scenes} />;
};

export default Bitcoin;
