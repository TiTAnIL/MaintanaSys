import React from 'react'
import { Route, Routes } from 'react-router-dom';
import routes from './routes'

import { AppHeader } from './cmps/app-header';

function App() {
  return (
    <div className="main-app">
      <AppHeader />
      {/* <main className='container'> */}
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      {/* </main> */}
    </div>
  )
}

export default App;
