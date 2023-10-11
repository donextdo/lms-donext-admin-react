import {useRoutes} from 'react-router-dom';

import UnauthorizedRoutes from './UnauthorizedRoutes';
import AdminAuthorizedRoutes from "./AdminAuthorizedRoutes";
import {useSelector} from "react-redux";
import {getSate} from "../../redux/actions/actions";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const authState = useSelector((state: any) => state.auth.authData);
    const user = getSate(authState)?.userData;
    // return useRoutes(user ? ROLES_ROUTES[user?.role] || UnauthorizedRoutes : UnauthorizedRoutes);
    return useRoutes(user ? ROLES_ROUTES[user?.role] || UnauthorizedRoutes : AdminAuthorizedRoutes);
}

const ROLES_ROUTES: any = {
    owner: AdminAuthorizedRoutes,
    undefined: UnauthorizedRoutes
};
