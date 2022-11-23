import "./LoginForm.css";

const LoginForm = ({ loginFormData, setloginFormData }) => {
  const handleInputData = (event) => {
    const { name, value } = event.target;
    setloginFormData({ ...loginFormData, [name]: value });
    console.log(loginFormData);
  };

  return (
    <form className="login-form--container">
      <input
        className="form-input"
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputData}
        value={loginFormData.username}
      />
      <input
        className="form-input"
        type="password"
        name="password"
        value={loginFormData.password}
        onChange={handleInputData}
        placeholder="Password"
        required
      />
    </form>
  );
};

export default LoginForm;
