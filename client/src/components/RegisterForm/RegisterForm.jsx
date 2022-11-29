import './RegisterForm.css';

const RegisterForm = ({ registerFormData, setRegisterFormData }) => {
  const handleInputData = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  return (
    <form className="register-form--container">
      <input
        className="form-input"
        type="text"
        name="username"
        placeholder="Username"
        value={registerFormData.username}
        onChange={handleInputData}
      />
      <input
        className="form-input"
        type="password"
        name="password"
        placeholder="Password"
        value={registerFormData.password}
        onChange={handleInputData}
      />
      <input
        className="form-input"
        type="email"
        name="email"
        placeholder="Email"
        value={registerFormData.email}
        onChange={handleInputData}
      />
    </form>
  );
};

export default RegisterForm;
