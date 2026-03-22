import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';
import { withLocale } from './decorators';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'i18n locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withLocale,
  ],
};

export default preview;
