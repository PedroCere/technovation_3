import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/errorpage';
import Inbox from './pages/Inbox';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Tasks from './pages/Today';
import Completed from './pages/Completed';
import Calendar from './pages/Today';
import Planner from './pages/Today';
import Stats from './pages/Today';
import Assistant from './pages/Today';
import Filters from './pages/Filters';





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
      {
        path: 'today',
        element: <Today />
      },
        {
        path: 'filters',
        element: <Filters />
      },
      {
        path: 'upcoming',
        element: <Upcoming />
      },
       {
        path: 'tasks',
        element: <Tasks />
      },
       {
        path: 'calendar',
        element: <Calendar />
      },
        {
        path: 'planner',
        element: <Planner/>
      },
        {
        path: 'stats',
        element: <Stats />
      },
        {
        path: 'assistant',
        element: <Assistant />
      },
        {
        path: 'completed',
        element: <Completed />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
