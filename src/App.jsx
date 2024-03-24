import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages/Pages";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    //request done
    setUser({
      id: 1,
      name: "jhon",
      persmission: ['analize'],
      role: ['admin']
    });

  }

  const logout = () => {
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Navigation></Navigation>
      {
        user ? (
          <button onClick={logout}>LogOut</button>
        ) : (
          <button onClick={login}>LogIn</button>
        )
      }

      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/analytics" element={<ProtectedRoute
          isAllowed={!!user && user.persmission.includes('analize')}
          redirectTo="/home"
        >
          <Analytics />
        </ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute
          isAllowed={!!user && user.role.includes('admin')}
          redirectTo="/home"
        >
          <Admin />
        </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}


function Navigation() {
  return <nav>
    <ul>
      <li><Link to='/landing'>Landing</Link></li>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/dashboard'>Dashboard</Link></li>
      <li><Link to='/analytics'>Analytics</Link></li>
      <li><Link to='/admin'>Admin</Link></li>
    </ul>
  </nav>
}

export default App;