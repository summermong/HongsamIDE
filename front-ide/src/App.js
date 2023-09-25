/** @format */

import './App.css';
import QuestionBar from './components/ide/QuestionBar';
import JavaCodeEditor from './components/ide/JavaCodeEditor';

function App() {
  return (
    <div className='h-screen'>
      <div className='flex'>
        <QuestionBar />
        <JavaCodeEditor />
      </div>
    </div>
  );
}

export default App;
