import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- IMPORT PENTING
import Header from './components/Header';   // Sesuaikan path ke komponen Anda
import Footer from './components/Footer';   // Sesuaikan path ke komponen Anda

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        {/* Outlet adalah tempat di mana komponen anak (RegisterForm, LoginForm, dll) akan dirender */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default Layout;