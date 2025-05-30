import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import ErrorPage from './pages/errorpage';
import Inbox from './pages/Inbox';
import Today from './pages/Today';
import Upcoming from './pages/Upcoming';
import Tasks from './pages/tasks';
import Completed from './pages/Completed';
import Calendar from './pages/calendar';
import Planner from './pages/Planner';
import Stats from './pages/stats';
import Assistant from './pages/assistant';
import Filters from './pages/Filters';
import Landing from './pages/Landing';
import Login from './pages/login';
import Home from './pages/home';
import List from './pages/list';
import Board from './pages/board';
import Settings from './pages/Inbox';
import Register from './pages/Register';
import MyThings from './pages/MyThings';
import { UserProvider } from './context/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'today', element: <Today /> },
      { path: 'filters', element: <Filters /> },
      { path: 'upcoming', element: <Upcoming /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'planner', element: <Planner /> },
      { path: 'stats', element: <Stats /> },
      { path: 'assistant', element: <Assistant /> },
      { path: 'completed', element: <Completed /> },
      { path: 'settings', element: <Settings /> },
      { path: 'mythings', element: <MyThings /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/home', element: <Home /> },
  { path: '/list', element: <List /> },
  { path: '/board', element: <Board /> }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
