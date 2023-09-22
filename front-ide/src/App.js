/** @format */

import './App.css';
import QuestionBar from './components/QuestionBar';
import JavaCodeEditor from './components/JavaCodeEditor';

function App() {
  return (
    <div className='h-screen'>
      <div className='flex'>
        <QuestionBar></QuestionBar>
        <JavaCodeEditor></JavaCodeEditor>
      </div>
    </div>
  );
}

export default App;
