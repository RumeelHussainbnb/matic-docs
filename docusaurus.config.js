module.exports = {
  title: "Polygon Technology | Documentation",
  tagline: "Welcome to Polygon developer documentation",
  url: "https://docs.polygon.technology/",
  baseUrl: "/",
  favicon: "img/polygon/polygon-logo.svg",
  organizationName: "Polygon Technology",
  projectName: "matic-docs",
  customFields: {
    description: "Build your next blockchain app on Polygon.",
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: ['/en/latest', '/en/'],
          },
          {
            to: '/docs/contribute/orientation',
            from: '/docs/pos/orientation',
          },
          {
            to: '/docs/contribute/community-maintainers',
            from: '/docs/pos/community-maintainers',
          },
          {
            to: '/docs/contribute/bug-bountry-program',
            from: '/docs/pos/bug-bountry-programs',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-biconomy',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-gsn',
          },
          {
            to: '/docs/develop/meta-transactions/network-agnostics',
            from: '/docs/develop/metatransactions/network-agnostics',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-on-ramp',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-ramps'
          },
          {
            to: '/docs/develop/network-details/full-node-binaries',
            from: '/docs/integrate/full-node-binaries',
          },
          {
            to: '/docs/develop/network-details/full-node-deployment',
            from: '/docs/integrate/full-node-deployment',
          },
          {
            to: '/docs/develop/metamask/overview',
            from: '/docs/develop/wallets/metamask',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets/cexs',
          },
        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/docs/validate/')) {
            return [existingPath.replace('/docs/maintain/')
          ];
          }
        },
      },
    ],
  ],
  onBrokenLinks: 'log',
  themeConfig: {
    footer: {
      style: 'dark',
      links: [
        {
          title: "Scaling Solutions",
          items: [
          {
              label: "Polygon PoS",
              href: "https://polygon.technology/solutions/polygon-pos/"
          },
          {
            label: "Polygon Edge",
            href: "https://polygon.technology/solutions/polygon-edge/"
          },
          {
              label: "Polygon Supernets",
              href: "https://polygon.technology/polygon-edge-supernets/"
          },
          {
            label: "Polygon Hermez",
            href: "https://polygon.technology/solutions/polygon-hermez/"
          },
          {
            label: "Polygon Avail",
            href: "https://polygon.technology/solutions/polygon-avail/"
          },
          {
              label: "Polygon Nightfall",
              href: "https://polygon.technology/solutions/polygon-nightfall/"
          },
          {
            label: "Polygon Zero",
            href: "https://polygon.technology/solutions/polygon-zero/"
          },
          {
            label: "Polygon Miden",
            href: "https://polygon.technology/solutions/polygon-miden/"
          },
       ]
       },
        {
          title: "Developers",
          items: [
          {
              label: "Get Started",
              href: "https://docs.polygon.technology/docs/develop/getting-started/"
          },
          {
              label: "Advocate Program",
              href: "https://polygon.technology/advocate-program/"
          },
          {
            label: "Polygon Funds",
            href: "https://polygon.technology/funds/"
          },
          {
            label: "Polygon Studios",
            href: "https://polygonstudios.com/"
          },
          {
              label: "Bug Bounty",
              href: "https://immunefi.com/bounty/polygon/"
          },
          {
            label: "dApps",
            href: "https://polygon.technology/ecosystem/"
          },
          {
            label: "Polygon Lightpaper",
            href: "https://polygon.technology/lightpaper-polygon.pdf"
          },
          {
            label: "Matic Whitepaper",
            href: "https://github.com/maticnetwork/whitepaper/"
          },
      ]
      },
     {
      title: "Company",
      items: [
      {
        label: "About Us",
        href: "https://polygon.technology/about/"
      },
      {
        label: "Contact",
        href: "https://polygon.technology/contact-us/"
      },
      {
        label: "Transparency Sheet",
        href: "https://polygon.technology/transparency-sheet/"
    },
      {
          label: "Blogs",
          href: "https://blog.polygon.technology/"
      },
      {
        label: "Brand Kit",
        href: "https://www.notion.so/polygontechnology/Brand-Resources-2cd18ae436584e98a6c5aae56db73058/"
      },
      {
        label: "Media Kit",
        href: "https://www.notion.so/polygontechnology/Polygon-Brand-Resources-2cd18ae436584e98a6c5aae56db73058/"
      },
      {
          label: "Careers",
          href: "https://polygon.technology/careers/"
      },
      {
        label: "Ecosystem Careers",
        href: "https://ecosystemjobs.polygon.technology/jobs/"
    },
    ]
    },
    ],
    logo: {
      alt: 'Polygon Logo',
      src: 'img/polygon/polygon-logo.svg',
      href: 'https://polygon.technology/',
    },
    copyright: `Copyright © ${new Date().getFullYear()} Polygon Technology`,
    },
    image: "https://matic.network/banners/matic-network-16x9.png",
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      indexName: "matic_developer",
      appId: '16JCDEHCCN',
      apiKey: "757c19b23127e9c6959da7f13b71cfab",
      contextualSearch: false,
      algoliaOptions: {},
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Polygon logo",
        src: "/img/polygon/polygon-logo.webp",
        srcDark: "/img/polygon/polygon-logo.webp",
        // width: 100,
        // height: 500,
        // href: 'https://docs.polygon.technology/', // default to siteConfig.baseUrl
        target: "_self", // by default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one)
      },
      items: [
        {
          label: "dApps",
          position: "right",
          items: [
                  {
                    href: 'https://wallet.polygon.technology/login?next=%2Fwallet',
                    label: 'PoS Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://wallet.polygon.technology/login?next=%2Fbridge',
                    label: 'PoS Bridge',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://polygon.technology/staking',
                    label: 'PoS Staking',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://wallet.polygon.technology/login?next=%2Fwidget-dashboard',
                    label: 'PoS Widget',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://polygonscan.com/',
                    label: 'PoS Explorer',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://hermez.io/wallet',
                    label: 'Hermez Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://explorer.hermez.io/',
                    label: 'Hermez Explorer',
                    target: '_blank',
                    rel: null,
                  },
                ],
        },
        {
          href: 'https://polygon.technology/developers/',
          label: "Developer Resources",
          position: "right",
        },
        {
          label: "Community",
          position: "right",
          items: [
                  {
                    href: 'https://discord.gg/tCmCbEff66',
                    label: 'Discord',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://forum.polygon.technology/',
                    label: 'Forum',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://www.reddit.com/r/0xPolygon/',
                    label: 'Reddit',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://twitter.com/0xPolygon',
                    label: 'Twitter',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://t.me/polygonofficial',
                    label: 'Telegram',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://polygon.technology/community/',
                    label: 'View all communities',
                    target: '_blank',
                    rel: null,
                  },
                ],
        },
        {
          label: "Support",
          position: "right",
          items: [
            {
              href: 'https://support.polygon.technology/support/home',
              label: 'End-user support',
              target: '_blank',
              rel: null,
            }
          ]
        },
        {
          label: "FAQs",
          position: "right",
          items: [
                  {
                    to: 'docs/faq/general-faq/',
                    label: 'PoS FAQ',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    to: 'docs/avail/faq',
                    label: 'Avail FAQ',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    to: 'docs/nightfall/faq/',
                    label: 'Nightfall FAQ',
                    target: '_blank',
                    rel: null,
                  }
                ],
        },
        {
          to: "docs/contribute/orientation/",
          label: "Contribute to the Wiki",
          position: "right",
          activeBasePath: "docs/contribute",
        },
        {
          href: "https://github.com/maticnetwork",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/matic-docs/tree/master/",
          path: "docs",
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
      // "@docuaurus/plugin-content-pages",
      // {
      //   path: "src/pages",
      //   routeBasePath: "",
      //   include: ["**/*.{js,jsx}"],
      // },
      // "@docusaurus/plugin-google-analytics",
      // "@docusaurus/plugin-sitemap",
      // {
      //   cacheTime: 600 * 1000, // 600 sec - cache purge period
      //   changefreq: "weekly",
      //   priority: 0.5,
      // },
    ],
  ],
};
