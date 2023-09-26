import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Question from './Pages/Question';
import Chat from './Chat/Chat';
import { AuthProvider } from './Pages/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/question" element={<Question />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
