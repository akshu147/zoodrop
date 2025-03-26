import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './assets/pages/Home.jsx'
import Login from './assets/pages/Login.jsx'
import Layout from './assets/Routerlayout/Layout.jsx'
import Prises from './assets/pages/Prises.jsx'
// import Test from './assets/pages/Test.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} /> {/* This is the correct way to set Home as default */}
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='rent' element={<Prises/>}/>
      {/* <Route path='/test' element={<Test/>}/> */}

    </Routes>
  </HashRouter>
)
