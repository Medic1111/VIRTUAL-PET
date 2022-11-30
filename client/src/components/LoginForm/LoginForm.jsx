import { FormContainer } from "./LoginForm.styles";

const LoginForm = ({ loginFormData, setLoginFormData }) => {
  const handleInputData = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  return (
    <FormContainer>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={loginFormData.username}
        onChange={handleInputData}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={loginFormData.password}
        onChange={handleInputData}
      />
    </FormContainer>
  );
};

export default LoginForm;
