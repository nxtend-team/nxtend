module.exports = {
  someSidebar: [
    {
      type: 'category',
      label: 'Nxtend',
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
      label: 'Ionic Angular',
      items: [
        'ionic-angular/overview',
        'ionic-angular/getting-started',
        {
          Schematics: [
            'ionic-angular/schematics/init',
            'ionic-angular/schematics/application',
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
          Builders: ['capacitor/builders/command'],
        },
      ],
    },
  ],
};
