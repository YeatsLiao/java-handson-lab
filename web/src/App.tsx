import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { LabPlaceholder } from './pages/LabPlaceholder';

import { PrimitiveTypes } from './pages/labs/PrimitiveTypes';
import { References } from './pages/labs/References';
import { Stack } from './pages/labs/Stack';
import { StringPool } from './pages/labs/StringPool';
import { FlowControl } from './pages/labs/FlowControl';
import { Polymorphism } from './pages/labs/Polymorphism';
import { Interfaces } from './pages/labs/Interfaces';
import { StaticMembers } from './pages/labs/StaticMembers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'labs/primitive-types',
        element: <PrimitiveTypes />,
      },
      {
        path: 'labs/references',
        element: <References />,
      },
      {
        path: 'labs/stack',
        element: <Stack />,
      },
      {
        path: 'labs/string-pool',
        element: <StringPool />,
      },
      {
        path: 'labs/flow-control',
        element: <FlowControl />,
      },
      {
        path: 'labs/polymorphism',
        element: <Polymorphism />,
      },
      {
        path: 'labs/interfaces',
        element: <Interfaces />,
      },
      {
        path: 'labs/static-members',
        element: <StaticMembers />,
      },
      {
        path: 'labs/:labId',
        element: <LabPlaceholder />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
