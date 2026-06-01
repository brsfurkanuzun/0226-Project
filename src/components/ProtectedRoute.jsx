import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * React Router v5 protected route.
 * If user is not logged in → redirects to /login, preserving the intended path
 * so the login page can send the user back after successful authentication.
 */
export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((s) => s.client.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: location } }}
          />
        )
      }
    />
  );
}
