import './LoginDashboard.css';


const LoginDashboard = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form>
          <div className="input-group">
            <span className="icon"></span>
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-group">
            <span className="icon"></span>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="forgot-password">Forgot your password?</p>
      </div>
    </div>
  );
}

export default LoginDashboard;