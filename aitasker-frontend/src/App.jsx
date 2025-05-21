import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/errorpage';
import Inbox from './pages/Inbox';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Inbox />
      },
 
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
