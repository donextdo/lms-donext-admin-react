const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard"
                    width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
        <path d="M13.45 11.55l2.05 -2.05"></path>
        <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
    </svg>,

user: <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user"
width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<circle cx="12" cy="7" r="4"></circle>
<path d="M12 17l-1 2h-4l-1 -2"></path>
<path d="M21 21v-2a4 4 0 0 0 -4 -4h-2"></path>
</svg>

}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.dashboard,
            breadcrumbs: false
        },
        {
            id: 'user',
            title: 'Users',
            type: 'item',
            url: '/users',
            icon: icons.user,
            breadcrumbs: false
        },
        {
            id: 'cources',
            title: 'Courses',
            type: 'item',
            url: '/courses',
            icon: icons.user,
            breadcrumbs: false
        },
        {
            id: 'class',
            title: 'Classes',
            type: 'item',
            url: '/classes',
            icon: icons.className,
            breadcrumbs: false
        },
        {
            id: 'lessons',
            title: 'Lessons',
            type: 'item',
            // url: '/users',
            icon: icons.user,
            breadcrumbs: false
        },
    ]
};

export default dashboard;
