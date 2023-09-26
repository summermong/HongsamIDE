import React, { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  /* 이메일 중복 검사 확인 */
  const [isEmailUnique, setIsEmailUnique] = useState(false);

  /* 이메일 중복 검사 함수 */
  const confirmID = ({ email }) => {
    axios
      .post('/members/signup/email-check', { email })
      .then((response) => {
        if (response.status === 200) {
          alert('사용 가능한 이메일입니다.');
          setIsEmailUnique(true);
        } else {
          alert('중복된 이메일입니다.');
          emailInputRef.current.focus();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* 회원가입 성공 시 라우팅 내비게이터 */
  const navigate = useNavigate();

  /* 회원가입 폼 제출 함수 */
  const onSignup = ({ email, password, username }) => {
    if (isEmailUnique) {
      const Data = {
        email,
        password,
        username,
      };

      axios
        .post('/members/signup', Data)
        .then((response) => {
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/home');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('이메일 중복을 확인하세요.');
    }
  };

  /* 이메일 중복 시 재입력을 위한 useRef */
  const emailInputRef = useRef(null);

  /* 비밀번호 일치를 위한 useRef */
  const passwordInputRef = useRef(null);
  passwordInputRef.current = watch('password');

  return (
    <div className={styles.Signup}>
      <div className={styles.subtitle}>Step for Developer</div>
      <div className={styles.title}>Hongsam IDE</div>
      <form className={styles.form} onSubmit={handleSubmit(onSignup)}>
        <label>ID</label>
        <div className={styles.id}>
          <input
            name="email"
            type="text"
            autoComplete="on"
            placeholder="이메일 형식으로 입력해주세요."
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          <button className={styles.confirmID_btn} onClick={confirmID}>
            중복 확인
          </button>
        </div>
        {errors.email && errors.email.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <p>아이디 형식이 올바르지 않습니다.</p>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          placeholder="영문+숫자+특수문자 조합의 7~15자로 입력해주세요."
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/i,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <p>비밀번호 형식이 올바르지 않습니다.</p>
        )}

        <label>Confirm Password</label>
        <input
          name="confirm"
          type="password"
          autoComplete="on"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('confirm', {
            required: true,
            validate: (value) => value === passwordInputRef.current,
          })}
        />
        {errors.confirm && errors.confirm.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.confirm && errors.confirm.type === 'validate' && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}

        <label>Name</label>
        <input
          name="username"
          autoComplete="on"
          placeholder="이름을 10자 이내로 입력해주세요."
          {...register('username', {
            required: true,
            maxLength: 10,
          })}
        />
        {errors.username && errors.username.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <p>10자 이내로 입력해주세요.</p>
        )}

        <button
          className={styles.submit_btn}
          disabled={!isEmailUnique}
          type="submit"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
