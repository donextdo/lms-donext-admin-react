const icons = {
    crib: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-triangle"
               width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
               strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path
            d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>,
    kyc: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-headset" width="20"
              height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
              strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 14v-3a8 8 0 1 1 16 0v3"/>
        <path d="M18 19c0 1.657 -2.686 3 -6 3"/>
        <path d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"/>
        <path d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"/>
    </svg>,
    shadow: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shadow" width="20"
                 height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                 strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M13 12h5"></path>
        <path d="M13 15h4"></path>
        <path d="M13 18h1"></path>
        <path d="M13 9h4"></path>
        <path d="M13 6h1"></path>
    </svg>,
    windmill: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-windmill" width="20"
                   height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                   strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12c2.76 0 5 -2.01 5 -4.5s-2.24 -4.5 -5 -4.5v9z"></path>
        <path d="M12 12c0 2.76 2.01 5 4.5 5s4.5 -2.24 4.5 -5h-9z"></path>
        <path d="M12 12c-2.76 0 -5 2.01 -5 4.5s2.24 4.5 5 4.5v-9z"></path>
        <path d="M12 12c0 -2.76 -2.01 -5 -4.5 -5s-4.5 2.24 -4.5 5h9z"></path>
    </svg>
}

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'reviews-pending',
    title: 'Reviews Pending',
    type: 'group',
    children: [
        {
            id: 'crib',
            title: 'CRIB Reviews Pending',
            type: 'item',
            url: '/reviews-pending/crib',
            icon: icons.crib,
            breadcrumbs: false
        },
        {
            id: 'kyc',
            title: 'KYC Reviews Pending',
            type: 'item',
            url: '/reviews-pending/kyc',
            icon: icons.kyc,
            breadcrumbs: false
        },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.shadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.windmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;
