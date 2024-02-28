export const ManagerMenu = [
    {
        id: 'ui-element',
        title: 'Manager',
        type: 'group',
        icon: 'icon-ui',
        children: [
          {
            id: 'button',
            title: 'Personnel',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Ajouter',
                type: 'item',
                url: '/personnel/ajout',
              },
              {
                id: 'button',
                title: 'Liste',
                type: 'item',
                url: '/personnel/list',
              }   
            ],
          },
          {
            id: 'button',
            title: 'Offre spécial',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Ajouter',
                type: 'item',
                url: '/offre/ajout',
              },
              {
                id: 'button',
                title: 'Liste',
                type: 'item',
                url: '/offre/list',
              }   
            ],
          },
          {
            id: 'button',
            title: 'Services',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Ajouter',
                type: 'item',
                url: '/services/ajout',
              },
              {
                id: 'button',
                title: 'Liste',
                type: 'item',
                url: '/services/list',
              }   
            ],
          },
          {
            id: 'button',
            title: 'Dépenses',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Salaire',
                type: 'item',
                url: '/salaire',
              },
              {
                id: 'button',
                title: 'Dépense',
                type: 'item',
                url: '/depense',
              }   
            ],
          },
          {
            id: 'button',
            title: 'Statistiques',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
              {
                id: 'button',
                title: 'Temps moyen de travail par employé',
                type: 'item',
                url: '/chart/worktime',
              },
              {
                id: 'button',
                title: 'Nombre de reservation par jour par mois',
                type: 'item',
                url: '/nb_reservation',
              },
              {
                id: 'button',
                title: 'Chiffre d affaire par jour par mois',
                type: 'item',
                url: '/chiffre_affaire',
              },
              {
                id: 'button',
                title: 'Benefice par mois',
                type: 'item',
                url: '/benefice_mensuel',
              }   
            ],
          },
          {
            id: 'button',
            title: 'Mon profil',
            type: 'collapse',
            icon: 'feather icon-box',
            children: [
                {
                    id: 'button',
                    title: 'Deconnexion',
                    type: 'item',
                    url: '/logout',
                }
            ],
          }
        ],
      },
];
