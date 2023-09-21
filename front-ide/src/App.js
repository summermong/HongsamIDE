/** @format */

import logo from './logo.svg';
import './App.css';
import QuestionBar from './components/QuestionBar';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <div className='flex'>
      <QuestionBar></QuestionBar>
      <CodeEditor></CodeEditor>
    </div>
  );
}

export default App;
