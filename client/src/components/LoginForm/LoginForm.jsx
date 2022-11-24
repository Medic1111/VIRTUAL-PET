import './LoginForm.css';

const LoginForm = ({ loginFormData, setLoginFormData }) => {
  const handleInputData = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  return (
    <form className="login-form--container">
      <input
        className="form-input"
        type="text"
        name="username"
        placeholder="Username"
        value={loginFormData.username}
        onChange={handleInputData}
      />
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password"
        value={loginFormData.password}
        onChange={handleInputData}
      />
    </form>
  );
};

export default LoginForm;
