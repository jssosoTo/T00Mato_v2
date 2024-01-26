import React, { ReactNode, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
// import TomatoNav from './components/TomatoNav/TomatoNav';
import TomatoFuncBar from './components/TomatoFuncBar';
import { AppContext } from './components/Context/AppAPI/AppAPI';
import Diary from './pages/Diary';
import DetailDiary from './pages/Diary/DetailDiary';
import Focus from './pages/Focus';
// import FutureTime from './pages/FutureTime';
import DataPage from './pages/DataPage';
import ToDo from './pages/ToDo';
// import DemoHeatmap from './components/DemoHeatMap';
import CountdownTime from './pages/CountdownTime';
import MyInfo from './pages/MyInfo';
import Login from './pages/Login';
import Error from './pages/Error';

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
    element: <CountdownTime />,
    // element: <FutureTime />,
  },
  {
    path: '/data',
    element: <DataPage />,
  },
  {
    path: '/focus',
    element: <Focus />,
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
  {
    path: '/myInfo',
    element: <MyInfo />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

function App() {
  const { isExtendFuncLeftBar: isExtendSideBar } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="*"
        element={
          <>
            {/* <TomatoNav isExtendSideBar={isExtendSideBar} /> */}
            {/* <DemoHeatmap /> */}
            <main className="main flex" style={{ position: 'relative' }}>
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
