import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kfreon.stupidsvelteapp',
  appName: 'sveltecooldudes',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
};

export default config;
