import Auth from './pages/Auth';
import Registration from './pages/Registration';
import Users from './pages/Users';
import UserMail from './pages/UserMail';
import NewMail from './pages/NewMail';
import {REGISTRATION_ROUTE, LOGIN_ROUTE, USERS_ROUTE, EMAIL_ROUTE, NEW_EMAIL_ROUTE} from './utils/const';

export const authRoutes = [
    {
        path: USERS_ROUTE,
        Component: Users
    },
    {
        path: EMAIL_ROUTE,
        Component: UserMail
    },
    {
        path: NEW_EMAIL_ROUTE,
        Component: NewMail
    },
]

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]