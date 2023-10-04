/** @format */

import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import TomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import TomorrowDarkTheme from 'monaco-themes/themes/Tomorrow-Night.json';
import { javaDefaultValue } from '../../defaultValues';
import axios from 'axios';

import ResultTerm from './ResultTerm';
import IdeTopBar from './IdeTopBar';

export default function JavaCodeEditor({
  leftWidth,
  isDarkMode,
  setIsDarkMode,
}) {
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
    padding: {
      top: 10,
      bottom: 10,
      left: 20,
      right: 20,
    },
    tabSize: 2,
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

    monaco.editor.defineTheme('tomorrow', TomorrowTheme);
    monaco.editor.defineTheme('tomorrowDark', TomorrowDarkTheme);

    monaco.editor.setTheme('tomorrow');

    isDarkMode
      ? monaco.editor.setTheme('tomorrowDark')
      : monaco.editor.setTheme('tomorrow');
  }, [monaco, isDarkMode]);
  // useEffect(() => {
  //   isDarkMode
  //     ? monaco.editor.setTheme('tomorrowDark')
  //     : monaco.editor.setTheme('tomorrow');
  // }, [isDarkMode]);

  const showValue = async () => {
    const code = editorRef.current.getValue();
    alert(editorRef.current.getValue());

    await axios
      .post(
        'https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/compile',
        { questionId: 'q1', uuid: 0, requestCode: code, language: 'java' }
      )
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCode = async () => {
    await axios
      .post(
        'https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/getcode',
        { questionId: 'q1', uuid: 0 }
      )
      .then((res) => {
        console.log(res.data);
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
      <IdeTopBar
        showValue={showValue}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div
        style={{
          position: 'relative',
          height: 'calc(100vh - 49px)',
          marginTop: '49px',
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
