import React, { useForm } from 'react-hook-form';
import { useRef } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSignup = ({ email, password, username }) => {
    const Data = {
      email,
      password,
      username,
    };

    axios // 수정 필요
      .post('/signup', Data, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const password = useRef();
  password.current = watch('password');

  return (
    <div className={styles.Login}>
      <div className={styles.subtitle}>Step for Developer</div>
      <div className={styles.title}>Hongsam IDE</div>
      <form className={styles.form} onSubmit={handleSubmit(onSignup)}>
        <label>ID</label>
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
          placeholder="영문+숫자+특수문자 조합의 7~15자 내외로 입력해주세요."
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
            validate: (value) => value === password.current,
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
          type="text"
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

        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
