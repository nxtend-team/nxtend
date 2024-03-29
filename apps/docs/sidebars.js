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
        'ionic-react/capacitor',
        {
          Generators: ['ionic-react/generators/application'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Ionic Angular',
      items: [
        'ionic-angular/overview',
        'ionic-angular/getting-started',
        'ionic-angular/capacitor',
        {
          Generators: ['ionic-angular/generators/application'],
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
          Generators: ['capacitor/generators/capacitor-project'],
          Executors: ['capacitor/executors/cap'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Firebase',
      items: [
        'firebase/overview',
        'firebase/getting-started',
        {
          Generators: ['firebase/generators/firebase-project'],
          Executors: ['firebase/executors/firebase'],
        },
      ],
    },
  ],
};
