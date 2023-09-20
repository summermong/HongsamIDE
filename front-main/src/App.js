import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
