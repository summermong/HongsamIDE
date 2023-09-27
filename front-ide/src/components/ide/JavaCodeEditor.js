/** @format */

import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import SolarizedLigthTheme from 'monaco-themes/themes/Solarized-light.json';
import { javaDefaultValue } from '../../defaultValues';
import axios from 'axios';

import ResultTerm from './ResultTerm';
import IdeTopBar from './IdeTopBar';

export default function JavaCodeEditor({ leftWidth }) {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    suggest: {
      // 자동완성 제안 활성화
      snippetsPreventQuickSuggestions: false,
      suggestions: [],
    },
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    console.log(isResizing);
    console.log('MouseDown');
  };

  const [topHeigth, setTopGeigth] = useState(80); // 초기 왼쪽 너비 설정
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      if (!isResizing) return;
      const totalHeigth = window.innerHeight;
      const newTopHeigth = (e.clientY / totalHeigth) * 100;
      const newBottomHeigth = 100 - newTopHeigth;
      setTopGeigth(newTopHeigth);
      console.log('Resizing');
      // 오른쪽 div 너비도 설정할 수 있음: setRightWidth(newRightWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      console.log('MouseUp');
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (!monaco) return;

    console.log('monaco instance:', monaco);

    monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);

    monaco.editor.setTheme('solarizedLigth');
  }, [monaco]);
  const showValue = async () => {
    const code = editorRef.current.getValue();
    alert(editorRef.current.getValue());
    console.log(JSON.stringify(editorRef.current.getValue()));
    console.log(code);
    const formData = new FormData();
    formData.append('requestCode', code);
    console.log(formData);

    await axios
      .post('http://localhost:8080/q1', formData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCode = async () => {
    await axios
      .get('http://localhost:8080/q1', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setCode(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditorChange = (value, event) => {
    console.log('here is the current model value:', value);
    setCode(value);
    console.log('code : ', code);
  };
  useEffect(() => {
    fetchCode();
  }, []);

  return (
    <>
      <IdeTopBar showValue={showValue} />
      <div
        style={{
          position: 'relative',
          height: 'calc(100vh - 42px)',
          marginTop: '42px',
          width: `${100 - leftWidth}%`, // 오른쪽 div의 너비를 설정
        }}
      >
        <Editor
          height={`${topHeigth}%`}
          width='100%'
          defaultLanguage='java'
          value={code}
          onMount={handleEditorDidMount}
          options={editorOptions}
          onChange={handleEditorChange}
        />

        <ResultTerm
          result={result}
          topHeigth={topHeigth}
          handleMouseDown={handleMouseDown}
        />
      </div>
    </>
  );
}
