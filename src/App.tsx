import React, { ReactNode, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import TomatoNav from './components/TomatoNav/TomatoNav';
import TomatoFuncBar from './components/TomatoFuncBar';
import { AppContext } from './components/Context/AppAPI/AppAPI';
import Diary from './pages/Diary';
import DetailDiary from './pages/Diary/DetailDiary';
import TimeClock from './pages/TimeClock';
import FutureTime from './pages/FutureTime';
import DataPage from './pages/DataPage';
import ToDo from './pages/ToDo';

type RoutesProp = {
  path: string;
  element: ReactNode;
  children?: RoutesProp[];
};

const formatRoutes = (routes: RoutesProp[]) => {
  return routes.map((item: RoutesProp, idx: number) => (
    <React.Fragment key={idx}>
      <Route path={item.path} element={item.element} />
      {item.children && formatRoutes(item.children)}
    </React.Fragment>
  ));
};

const routes: RoutesProp[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/todo',
    element: <ToDo />,
  },
  {
    path: '/futureTime',
    element: <FutureTime />,
  },
  {
    path: '/data',
    element: <DataPage />,
  },
  {
    path: '/focus',
    element: <TimeClock />,
  },
  {
    path: '/diary',
    element: <Diary />,
    children: [
      {
        path: '/diary/detail/',
        element: <DetailDiary />,
      },
      {
        path: '/diary/detail/:id',
        element: <DetailDiary />,
      },
    ],
  },
];

function App() {
  const { isExtendFuncLeftBar: isExtendSideBar } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/login" element={<>Login Page</>}></Route>
      <Route
        path="*"
        element={
          <>
            <TomatoNav isExtendSideBar={isExtendSideBar} />
            <main className="main flex">
              <TomatoFuncBar isShow={isExtendSideBar} />
              <Routes>{formatRoutes(routes)}</Routes>
            </main>
          </>
        }
      ></Route>
    </Routes>
  );
}

export default App;
