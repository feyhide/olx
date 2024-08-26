import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout'; 
import AdminLayout from './components/layouts/AdminLayout'; 
import Home from './components/pages/Home';
import PrivateRoute from './components/utils/PrivateRoute';
import AdminRoute from './components/utils/AdminRoute';
import ViewProducts from './components/dashboardcomponents/ViewProducts';
import CreateProduct from './components/dashboardcomponents/CreateProduct';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route element={<PrivateRoute />}>
          
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin/viewproducts' element={<ViewProducts />} />
            <Route path='/admin/createproducts' element={<CreateProduct />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
