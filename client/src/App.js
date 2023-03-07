import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import PagesComposing from './pages/pagesComposing';
import Login from './pages/Registration&Login/Login';
import Register from './pages/Registration&Login/Register';
import React from 'react';
import LanguagePopup from './components/LanguagePopup';
import CompagePage from './pages/ComparePage';
import CategoriesPage from './pages/CategoriesPage';
import { useDispatch } from 'react-redux';
import { fetchCurrency } from './redux/Slicess/cartSlice2';
import Breadcrumbs from './components/Breadcrumbs';
import SearchPage from './pages/SearchPage';
import { ToastContainer } from 'react-toastify';
import Guarantee from './pages/Guarantee';
import Payment from './pages/Payment';
import Cooperation from './pages/Cooperation';
import Delivery from './pages/Delivery';
import Brands from './pages/Brands';
import Portfolio from './pages/Portfolio';
import Support from './pages/Support';
import News from './pages/News';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Oferts from './pages/Oferts';
import Services from './pages/Services';
import NewProducts from './pages/NewProducts';

const Layout = () => {
  const [cartStatus, setCartStatus] = React.useState(false);
  const [languageStatus, setLanguageStatus] = React.useState(false);
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />

      <LanguagePopup
        languageStatus={languageStatus}
        setLanguageStatus={setLanguageStatus}
      />
      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <Header
        cartStatus={cartStatus}
        setCartStatus={setCartStatus}
        setLanguageStatus={setLanguageStatus}
        languageStatus={languageStatus}
      />
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/compare',
        element: <CompagePage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/guarantee',
        element: <Guarantee />,
      },
      {
        path: '/delivery',
        element: <Delivery />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/cooperation',
        element: <Cooperation />,
      },
      {
        path: '/brands',
        element: <Brands />,
      },
      {
        path: '/portfolio',
        element: <Portfolio />,
      },
      {
        path: '/support',
        element: <Support />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/oferts',
        element: <Oferts />,
      },
      {
        path: '/new_products',
        element: <NewProducts />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/:url',
        element: <PagesComposing />,
      },

      // {
      //   path: '/search/:searchValue',
      //   element: <SearchPage />,
      // },
      // {
      //   path: '/admin',
      //   element: <AdminOutlet />,
      //   children: [
      //     {
      //       path: '/admin/product/:id',
      //       element: <UpdateProduct />,
      //     },
      //     {
      //       path: '/admin/product',
      //       element: <UpdateProduct />,
      //     },
      //     {
      //       path: '/admin/category',
      //       element: <UpdateCategory />,
      //     },
      //     {
      //       path: '/admin/users',
      //       element: <Users />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCurrency());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
