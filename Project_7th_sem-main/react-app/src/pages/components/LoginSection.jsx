import { useState } from "react";

function LoginSection(props) {
  let [show, toggle] = useState(false);
  let [login, change] = useState(true);

  let handleChange = () => {
    login ? change(false) : change(true);
  };
  let handleClick = () => {
    show ? toggle(false) : toggle(true);
  };
  {
    /*  */
  }
  return (
    <div className="login-section">
      <button onClick={() => handleClick()}>{show ? "X" : props.title}</button>
      {show ? (
        login ? (
          <>
            <button onClick={() => handleChange()}>SignUp?</button>
            <LoginForm id={props.id} name={props.name} title={props.title} />
          </>
        ) : (
          <>
            <button onClick={() => handleChange()}>Login?</button>
            <SignUpForm id={props.id} name={props.name} title={props.title} />
          </>
        )
      ) : null}
    </div>
  );
}

function LoginForm({ id, name, title }) {
  return (
    <div>
      <h2>{title} Login</h2>
      <form className="login-form">
        <label htmlFor={name}>Phone Number:</label>
        <input type="tel" id={id} name={name} required />

        <label htmlFor="citizenPassword">Password:</label>
        <input
          type="password"
          id="citizenPassword"
          name="citizenPassword"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function SignUpForm({ id, name, title }) {
  return (
    <div>
      <h2>{title} SignUp</h2>
      <form className="login-form">
        <label htmlFor={name}>Phone Number:</label>
        <input type="tel" id={id} name={name} required />

        <label htmlFor="citizenPassword">Password:</label>
        <input
          type="password"
          id="citizenPassword"
          name="citizenPassword"
          required
        />
        <label htmlFor="citizenPasswordRepeat">Repeat Password:</label>
        <input
          type="password"
          id="citizenPasswordRepeat"
          name="citizenPasswordRepeat"
          required
        />

        <button type="submit">Create !</button>
      </form>
    </div>
  );
}

export default LoginSection;
