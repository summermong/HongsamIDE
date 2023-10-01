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
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
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

    monaco.editor.defineTheme('solarizedLigth', SolarizedLigthTheme);

    monaco.editor.setTheme('solarizedLigth');
  }, [monaco]);
  const showValue = async () => {
    const code = editorRef.current.getValue();
    alert(editorRef.current.getValue());

    const formData = new FormData();
    formData.append('requestCode', code);

    await axios
      .post('http://localhost:8080/q1', formData, { withCredentials: true })
      .then((res) => {
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
        if (res.data === '') {
          setCode(javaDefaultValue);
        } else {
          setCode(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditorChange = (value, event) => {
    setCode(value);
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
