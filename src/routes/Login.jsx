import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

function Login() {
  const[ name, setName ]= useState("");
  const[ password, setPassword ]= useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({ name, password }))
    navigate("/");
    setName("");
    setPassword("");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name"> User Name</label>
          <input 
            type="text" 
            id="name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
         <div className={styles.inputWrapper}>
          <label htmlFor="password"> Password</label>
          <input 
            type="text" 
            id="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign In"/>
      </form>
    </div>
  );
};

export default Login;