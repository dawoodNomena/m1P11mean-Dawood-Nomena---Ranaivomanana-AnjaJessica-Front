export const ClientMenu = [
    {
      id: 'ui-element',
      title: 'Client',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'basic',
          title: 'Voitures',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Ajouter',
              type: 'item',
              url: '/voiture/ajout',
            },
            {
              id: 'badges',
              title: 'Liste',
              type: 'item',
              url: '/voiture/list',
            }   
          ],
        },
      ],
    },
  ];