import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'From Simulated Brains to Embodied Intelligence',
  favicon: 'img/favicon.ico',

  url: 'https://your-username.github.io',
  //url: 'https://physical-ai-humanoid-robotics-book-frontend.vercel.app',
  //baseUrl: '/physical-ai-and-humanoid-robotics-textbook/',
  baseUrl: '/',

  organizationName: 'your-username',
  projectName: 'physical-ai-and-humanoid-robotics-textbook',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  /** ✅ FIX: browser-safe env exposure */
  customFields: {
    CHATBOT_API_URL:
      process.env.CHATBOT_API_URL || 'http://localhost:8000' || 'https://ai-native-book-backend-production-0fd7.up.railway.app/',
  },


  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'ur'],
  // },
  //  i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'ur'],
  //   localeConfigs: {
  //     en: {
  //       label: 'English',
  //       direction: 'ltr',
  //     },
  //     ur: {
  //       label: 'اردو',
  //       direction: 'rtl',
  //     },
  //   },
  // },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Chapters',
        },
        { to: '/docs/chatbot', label: 'RAG Chatbot', position: 'left' },
        {
          //href: 'https://github.com/your-username/physical-ai-and-humanoid-robotics-textbook',
          href:'https://github.com/Sana-Farasat/AI-Native-Book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;