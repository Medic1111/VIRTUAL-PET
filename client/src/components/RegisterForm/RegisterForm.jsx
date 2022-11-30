import { FormContainer } from "../LoginForm/LoginForm.styles";

const RegisterForm = ({ registerFormData, setRegisterFormData }) => {
  const handleInputData = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  return (
    <FormContainer>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={registerFormData.username}
        onChange={handleInputData}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={registerFormData.password}
        onChange={handleInputData}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={registerFormData.email}
        onChange={handleInputData}
      />
    </FormContainer>
  );
};

export default RegisterForm;
