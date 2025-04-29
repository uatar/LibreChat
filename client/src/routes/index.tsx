import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  Registration,
  RequestPasswordReset,
  ResetPassword,
  VerifyEmail,
  ApiErrorWatcher,
  TwoFactorScreen,
} from '~/components/Auth';
import { AuthContextProvider } from '~/hooks/AuthContext';
import RouteErrorBoundary from './RouteErrorBoundary';
import StartupLayout from './Layouts/Startup';
import LoginLayout from './Layouts/Login';
import dashboardRoutes from './Dashboard';
import ShareRoute from './ShareRoute';
import ChatRoute from './ChatRoute';
import Search from './Search';
import Root from './Root';
import { basePath, paths } from './RoutePaths';

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

export const router = createBrowserRouter(
  [
    {
      path: paths.share,
      element: <ShareRoute />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      path: '',
      element: <StartupLayout />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: paths.register,
          element: <Registration />,
        },
        {
          path: paths.forgotPassword,
          element: <RequestPasswordReset />,
        },
        {
          path: paths.resetPassword,
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: paths.verifyEmail,
      element: <VerifyEmail />,
      errorElement: <RouteErrorBoundary />,
    },
    {
      element: <AuthLayout />,
      errorElement: <RouteErrorBoundary />,
      children: [
        {
          path: '',
          element: <LoginLayout />,
          children: [
            {
              path: paths.login,
              element: <Login />,
            },
            {
              path: 'login/2fa', // no need to prefix again because 2FA is a subpath of login
              element: <TwoFactorScreen />,
            },
          ],
        },
        dashboardRoutes,
        {
          path: '',
          element: <Root />,
          children: [
            {
              index: true,
              element: <Navigate to={paths.newConversation} replace={true} />,
            },
            {
              path: paths.conversation,
              element: <ChatRoute />,
            },
            {
              path: paths.search,
              element: <Search />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: basePath,
  },
);
