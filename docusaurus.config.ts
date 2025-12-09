import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Yash Jawale",
  tagline: "Resources & Guides for random quirks",
  favicon: "img/logo.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://wiki.yashjawale.in",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "yashjawale", // Usually your GitHub org/user name.
  projectName: "wiki", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/yashjawale/wiki/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-8Q4KF722K3",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/wiki-og.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Wiki",
      logo: {
        alt: "Yash Jawale",
        src: "img/logo.svg",
      },
      items: [
        {
          href: "https://github.com/yashjawale/wiki",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Sites",
          items: [
            {
              label: "Main Site",
              to: "https://yashjawale.in",
            },
            {
              label: "Playground",
              to: "https://yashjawale.in/playground",
            },
          ],
        },
        {
          title: "Connect",
          items: [
            {
              label: "connect@yashjawale.in",
              href: "mailto:connect@yashjawale.in",
            },
          ],
        },
        {
          title: "Socials",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/yashjawale",
            },
            {
              label: "Instagram",
              href: "https://instagram.com/imyashjawale",
            },
            {
              label: "Twitter / X",
              href: "https://twitter.com/imyashjawale",
            },
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/yashjawale",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Yash Jawale.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      "@cmfcmf/docusaurus-search-local",
      {
        indexBlog: false,
      },
    ],
  ],
};

export default config;
