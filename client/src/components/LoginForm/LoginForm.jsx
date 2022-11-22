import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="login-form--container">
      <input className="form-input" type="text" placeholder="Username" />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        required
      />
    </div>
  );
};

export default LoginForm;
