import React, { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* 로그인 성공 시 라우팅 내비게이터 */
  const navigate = useNavigate();

  /* 로그인 함수 */
  const onLogin = ({ email, password }) => {
    const Data = {
      email,
      password,
    };

    axios
      .post('/members/login', Data)
      .then((response) => {
        if (response.status === 200) {
          // Q. 이 정보를 전역으로 사용하려면?
          console.log(response.data.name);
          navigate('/home');
        }
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
        <button className={styles.login_btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
