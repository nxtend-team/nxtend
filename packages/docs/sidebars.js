module.exports = {
  someSidebar: [
    {
      type: 'category',
      label: 'nxtend',
      items: ['nxtend/introduction', 'nxtend/upgrades', 'nxtend/contributing'],
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
    {
      type: 'category',
      label: 'Capacitor',
      items: [
        'capacitor/overview',
        'capacitor/getting-started',
        {
          Schematics: [
            'capacitor/schematics/init',
            'capacitor/schematics/capacitor-project',
            'capacitor/schematics/add-plugin',
          ],
          Builders: [
            'capacitor/builders/add',
            'capacitor/builders/copy',
            'capacitor/builders/update',
            'capacitor/builders/sync',
            'capacitor/builders/open',
          ],
        },
      ],
    },
  ],
};
