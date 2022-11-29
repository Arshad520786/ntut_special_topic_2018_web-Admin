import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Login } from "../../Redux/_Actions/Login.Actions";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // ------------------------------------------
    this.state = {
      ID: "",
      Password: "",
      Submitted: false
    };
    // ------------------------------------------
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  // =============================================
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  // =============================================
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ Submitted: true });
    const { ID, Password } = this.state;
    const { dispatch } = this.props;
    if (ID && Password) {
      dispatch(Login(ID, Password));
    };
  
    
  }
  // =============================================
  render() {
    // ==================================================

    const { ID, Password, Submitted } = this.state;

    // ==================================================
    return (
      <div className="container">
        <div className="col-md-5 offset-md-4">
          <h2 className="offset-md-5">Login</h2>
          {/* ======================================== */}
          <form name="form" onSubmit={this.handleSubmit}>
            {/* ---------------[ID]------------------- */}
            <div
              className={"form-group" + (Submitted && !ID ? " has-error" : "")}
            >
              <label htmlFor="ID">E-Mail</label>
              <input
                type="text"
                className="form-control"
                name="ID"
                value={ID}
                onChange={this.handleChange}
              />
              {Submitted && !ID && (
                <div className="help-block text-danger">ID is required</div>
              )}
            </div>
            {/* --------------[Password]--------------- */}
            <div
              className={
                "form-group has-error" +
                (Submitted && Password ? " has-error" : "")
              }
            >
              <label htmlFor="Password">Password</label>
              <input
                type="Password"
                className="form-control"
                name="Password"
                value={Password}
                onChange={this.handleChange}
              />
              {Submitted && !Password && (
                <div className="help-block text-danger">
                  Password is required
                </div>
              )}
            </div>
            {/* --------------[Button]--------------- */}
            <div className="form-group">
              <button className="btn btn-primary">Login</button>
              <Link to="/Register" className="btn btn-link">
                Register
              </Link>
              <Link to="/" className="btn btn-link">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { LoggingIn } = state.AuthenticationReducers;
  return {
    LoggingIn
  };
}

const LogIn = withRouter(connect(mapStateToProps)(LoginPage));

export default LogIn;
