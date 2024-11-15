module.exports = {
  title: 'Nxtend',
  tagline: 'A collection of third-party Nx plugins',
  url: 'https://nxtend.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Devin Shoemaker',
  projectName: 'Nxtend',
  themeConfig: {
    announcementBar: {
      id: 'deprecated',
      content:
        'This library is <strong>deprecated</strong> in favor of <strong><a target="_blank" rel="noopener noreferrer" href="https://nxext.dev/">Nxext</a></strong>.',
      backgroundColor: '#fddfdf',
      textColor: '#f6433e',
      isCloseable: false,
    },
    navbar: {
      title: 'Home',
      items: [
        {
          to: 'docs/nxtend/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/nxtend-team/nxtend',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Introduction',
        //       to: 'docs/doc1',
        //     },
        //     {
        //       label: 'Ionic React Getting Started',
        //       to: 'docs/doc2',
        //     },
        //   ],
        // },
        // // {
        // //   title: 'Community',
        // //   items: [
        // //     {
        // //       label: 'Stack Overflow',
        // //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        // //     },
        // //     {
        // //       label: 'Discord',
        // //       href: 'https://discordapp.com/invite/docusaurus',
        // //     },
        // //   ],
        // // },
        // {
        //   title: 'Social',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: 'blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/nxtend-team/nxtend',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/devinshoemaker',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Devin Shoemaker. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/nxtend-team/nxtend/edit/main/packages/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
