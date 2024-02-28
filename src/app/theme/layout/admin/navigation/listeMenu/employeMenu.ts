export const EmployeMenu = [
    {
        id: 'ui-element',
        title: 'Employé',
        type: 'group',
        icon: 'icon-ui',
        children: [
            {
                id: 'button',
                title: 'Mes rendez-vous',
                type: 'item',
                url: '/mes_rdv/list',
            },
            {
                id: 'button',
                title: 'Suivi des taches',
                type: 'item',
                url: '/suivi_taches',
            },
            {
                id: 'button',
                title: 'Mon profil',
                type: 'collapse',
                url: '/suivi_taches',
                children: [
                    {
                        id: 'button',
                        title: 'Profil',
                        type: 'item',
                        url: '/profil',
                    },
                    {
                        id: 'button',
                        title: 'Permission',
                        type: 'item',
                        url: '/permission',
                    },
                    {
                        id: 'button',
                        title: 'déconnexion',
                        type: 'item',
                        url: '/logout',
                    },
                ],
            },
        ],
    },
];