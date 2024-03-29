import './App.css'
import { Routes, Route } from 'react-router-dom'
import { getUser } from "./utils/users_service"
import { useState } from 'react';
import HomePage from './pages/HomePage';
import LogInBusinessPage from './pages/LogInBusinessPage';
import LogInDependentPage from './pages/LogInDependentPage';
import SignUpBusinessPage from './pages/SignUpBusinessPage';
import SignUpDependentPage from './pages/SignUpDependentPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';
import NavBar from './components/NavBar'

function App() {

  const [user, setUser] = useState(getUser())

  const login = data => {
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <div className="App">
      <NavBar user={user} onLogOut={logout}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup/owner" element={<SignUpBusinessPage onLogIn={login} />}/>
        <Route path="/signup/dependent" element={<SignUpDependentPage onLogIn={login} />}/>
        <Route path="/login/owner" element={<LogInBusinessPage onLogIn={login} />}/>
        <Route path="/login/dependent" element={<LogInDependentPage onLogIn={login} />}/>
        <Route path="/profile" element={<ProfilePage user={user} onLogIn={login} onSetUser={setUser}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

