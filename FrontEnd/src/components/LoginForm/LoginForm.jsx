import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginUser } from "../../redux/features/loginSlice";
import { useNavigate } from "react-router-dom";
import loginStyles from "./Login.module.css";
import { clearMessage } from "../../redux/features/messageSlice";
import { getCurrentUser } from "../../services/auth.service";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const user = getCurrentUser()
    console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);



  const initialValues = {
    email: "",
    password: "",
  };
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  
  const WelcomeHome = () => (
    <>
      <div>Welcome Home {user.user.firstname} </div>
    </>
  );

  const [formValues, setFormValues] = useState(initialValues);

  const [validEmail, setValidEmail] = useState(null);
  const [validPassword, setValidPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value.trim() });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail()) setValidEmail(null);

    if (validatePassword()) setValidPassword(null);

    if (validateEmail() && validatePassword()) logUser();
  };
  function logUser() {
    setLoading(true);

    const user = {
      email: formValues.email,
      password: formValues.password,
    };

    dispatch(loginUser(user))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function validatePassword() {
    if (formValues.password === "") {
      setValidPassword("Password is Empty");
      return false;
    }
    // if (!PWD_REGEX.test(formValues.password)) {
    //   setValidPassword("Please Input the right Password format");
    //   return false;
    // }
    return true;
  }
  function validateEmail() {
    if (formValues.email === "") {
      setValidEmail("Email is Empty");
      return false;
    }

    if (!EMAIL_REGEX.test(formValues.email)) {
      setValidEmail("Please Input the right email format");
      return false;
    }
    return true;
  }

  return (
    <>
      {" "}
      {!user.user ? (
        <div className={loginStyles.body}>
          <h4 className={loginStyles.formTitle}>Login Here</h4>
          <form className={loginStyles.formBody} onSubmit={handleSubmit}>
            {message && <p className={loginStyles.textError}>{message}</p>}
            <div className={loginStyles.formRow}>
              <label className={loginStyles.label}>Email:</label>
              <input
                className={loginStyles.input}
                name="email"
                placeholder="Input email"
                value={formValues.email}
                onChange={handleChange}
              ></input>
              {validEmail && (
                <p className={loginStyles.textError}>{validEmail}</p>
              )}
            </div>
            <div className={loginStyles.formRow}>
              <label className={loginStyles.label}>Password:</label>
              <input
                type="password"
                className={loginStyles.input}
                name="password"
                placeholder="Input pass"
                value={formValues.password}
                onChange={handleChange}
              ></input>
              {validPassword && (
                <p className={loginStyles.textError}>{validPassword}</p>
              )}
            </div>

            <input type="submit" value="Login" className={loginStyles.submit} />
          </form>
        </div>
      ) : (
        <WelcomeHome />
      )}
    </>
  );
};

export default LoginForm;
