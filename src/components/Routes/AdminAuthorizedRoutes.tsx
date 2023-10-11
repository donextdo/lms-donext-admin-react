import {Navigate} from "react-router-dom";
import MainLayout from "../MainLayout";
import Loadable from "./RouteLoad/Loadable";
import {lazy} from "react";

const Dashboard = Loadable(lazy(() => import('../Dashboard/index')));
//const Configurations = Loadable(lazy(() => import('../Configurations')));
const UnauthorizedAccess = Loadable(lazy(() => import('../../utils/ui-components/UnauthorizedAccess')));
const CreateNewUser = Loadable(lazy(() => import('../../components/Authentication/authentication/createNewUser')));
const UpdateUser = Loadable(lazy(() => import('../../components/Authentication/authentication/updateUser ')));
const UerCreation = Loadable(lazy(() => import('../../components/User/')));
const CourceCreation = Loadable(lazy(()=>import('../../components/Cource')));
const ClassCreation = Loadable(lazy(() => import('../../components/Classes/')));
const LessonCreation = Loadable(lazy(() => import('../../components/Lesson/')));

const AdminAuthorizedRoutes =
    [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard/>
                },
                {
                    path: 'users',
                    element: <UerCreation/>
                },
                {
                    path: 'courses',
                    element: <CourceCreation/>
                },
                {
                    path: 'classes',
                    element: <ClassCreation/>
                },
                {
                    path: 'lessons',
                    element: <LessonCreation/>
                },
                // {
                //     path: 'reviews-pending',
                //     children: [
                //         {
                //             path: 'crib',
                //             element: <CribReviewPending/>
                //         },
                //         {
                //             path: 'kyc',
                //             element: <KycReviewPending/>
                //         }
                //     ]
                // },
                // {
                //     path: 'settings',
                //     element: <Configurations/>
                // },
            ]
        },
        {
            path: 'unauthorized',
            element: <UnauthorizedAccess/>
        },
        {
            path: '',
            element: <Navigate to="/dashboard"/>
        },
        {
            path: 'login',
            element: <Navigate to="/dashboard"/>
        },
        {
            path: 'newUser',
            element: <CreateNewUser/>
        },
        {
            path: 'updateUser',
            element: <UpdateUser/>
        },
        {
            path: "*",
            element: <Navigate to="/unauthorized"/>
        },
    ];

export default AdminAuthorizedRoutes;