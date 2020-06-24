module.exports = {
  someSidebar: [
    {
      type: 'category',
      label: 'nxtend',
      items: ['nxtend/introduction', 'nxtend/contributing'],
    },
    {
      type: 'category',
      label: 'Ionic React',
      items: [
        'ionic-react/overview',
        'ionic-react/getting-started',
        {
          Schematics: [
            'ionic-react/schematics/init',
            'ionic-react/schematics/application',
          ],
        },
      ],
    },
  ],
};
