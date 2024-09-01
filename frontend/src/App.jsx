import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout'; 
import AdminLayout from './components/layouts/AdminLayout'; 
import Home from './components/pages/Home';
import PrivateRoute from './components/utils/PrivateRoute';
import AdminRoute from './components/utils/AdminRoute';
import ViewProducts from './components/dashboardcomponents/ViewProducts';
import CreateProduct from './components/dashboardcomponents/CreateProduct';
import UpdateProduct from './components/dashboardcomponents/UpdateProduct';
import Search from './components/pages/Search';
import ProductPage from './components/pages/ProductPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product/:productid' element={<ProductPage />} />
          <Route element={<PrivateRoute />}>
          
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/admin/viewproducts' element={<ViewProducts />} />
            <Route path='/admin/createproducts' element={<CreateProduct />} />
            <Route path='/admin/updateproduct/:productid' element={<UpdateProduct />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
