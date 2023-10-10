/** @format */

import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import TomorrowTheme from 'monaco-themes/themes/Tomorrow.json';
import TomorrowDarkTheme from 'monaco-themes/themes/Tomorrow-Night.json';
import { javaDefaultValue } from '../../defaultValues';
import axios from 'axios';

import styles from './JavaCodeEditor.module.css';
import ResultTerm from './ResultTerm';
import IdeTopBar from './IdeTopBar';
import { useParams } from 'react-router-dom';
import ResultModal from './ResultModal';

export default function JavaCodeEditor({
  leftWidth,
  isDarkMode,
  setIsDarkMode,
}) {
  const monaco = useMonaco();
  const editorRef = useRef(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');
  const { uuidParam, questionIdParam } = useParams();
  const [resultModalView, setResultModalView] = useState(false);

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

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme('tomorrow', TomorrowTheme);
    monaco.editor.defineTheme('tomorrowDark', TomorrowDarkTheme);

    monaco.editor.setTheme('tomorrow');

    isDarkMode
      ? monaco.editor.setTheme('tomorrowDark')
      : monaco.editor.setTheme('tomorrow');
  }, [monaco, isDarkMode]);

  const compileCode = async () => {
    const code = editorRef.current.getValue();
    setResult('코드 컴파일 진행중 ...');
    await axios
      .post(
        'https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/compile',
        {
          uuid: uuidParam,
          questionId: questionIdParam,
          requestCode: code,
          language: 'java',
        }
      )
      .then((res) => {
        setResult(res.data);
        if (res.data === '정답입니다.' || res.data === '틀렸습니다.') {
          setResultModalView(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const saveCode = async () => {
    const code = editorRef.current.getValue();
    setResult('코드 저장 중...');
    await axios
      .post(
        'https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/savecode',
        {
          uuid: uuidParam,
          questionId: questionIdParam,
          requestCode: code,
          language: 'java',
        }
      )
      .then((res) => {
        setResult('코드 저장 완료');
      })
      .catch((err) => {
        console.log(err);
        setResult('코드 저장 실패 \n Run을 눌러도 코드 저장을 할수 있습니다.');
      });
  };

  const fetchCode = async () => {
    setResult('코드 불러오기중...');
    await axios
      .post(
        'https://4s06mb280b.execute-api.ap-northeast-2.amazonaws.com/getcode',
        { questionId: questionIdParam, uuid: uuidParam }
      )
      .then((res) => {
        setCode(res.data);
        setResult('코드 불러오기 완료');
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setCode(javaDefaultValue(questionIdParam));
          setResult(
            '주석을 보고 코드 작성 방법을 이해한 후에 아래의 타이머를 시작하여 문제를 풀어보세요 ! \n 아래의 타이머를 이용해서 내가 문제를 푼 동안 걸린 시간을 측정해보세요 !'
          );
        }
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
      {resultModalView ? (
        <ResultModal
          isDarkMode={isDarkMode}
          result={result}
          setResultModalView={setResultModalView}
        />
      ) : null}

      <IdeTopBar
        compileCode={compileCode}
        fetchCode={fetchCode}
        saveCode={saveCode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div
        className={`${styles.codeEditorContainer}`}
        style={{
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
