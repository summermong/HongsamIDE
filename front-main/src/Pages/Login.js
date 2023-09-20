import React, { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = ({ email, password }) => {
    const Data = {
      email,
      password,
    };

    axios // 수정 필요
      .post('/login', Data, {
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

  return (
    <div className={styles.Login}>
      <div className={styles.subtitle}>Step for Developer</div>
      <div className={styles.title}>Hongsam IDE</div>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <label>ID</label>
        <input
          name="email"
          type="email"
          autoComplete="on"
          placeholder="아이디를 입력하세요."
          {...register('email', {
            required: true,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          placeholder="비밀번호를 입력하세요."
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <Link to={'/signup'}>Sign up</Link>
        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
