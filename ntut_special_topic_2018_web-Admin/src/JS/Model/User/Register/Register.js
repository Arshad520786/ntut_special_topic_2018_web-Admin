import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Register } from "../../Redux/_Actions/Register.Actions";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        Account: "",
        password: "",
        Name: "",
        Gender: 1,
        Countrycode: "+886",
        Number: ""
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //----------------------------------------------------------------
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }
  //-----------------------------------------------------------------
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (
      user.Account &&
      user.password &&
      user.Name &&
      user.Gender &&
      user.Countrycode &&
      user.Number
    ) {
      dispatch(Register(user));
    }
  }
  //--------------------------------------------------------------------
  render() {
    const { user, submitted } = this.state;
    return (
      <div className="col-md-5 offset-md-4">
        <h2 className="offset-md-5">Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {/*-------------------Account-------------------*/}
          <div
            className={
              "form-group" + (submitted && !user.Account ? " has-error" : "")
            }
          >
            <label htmlFor="Account">Account</label>
            <input
              type="text"
              className="form-control"
              name="Account"
              value={user.Account}
              onChange={this.handleChange}
            />
            {submitted && !user.Account && (
              <div className="help-block text-danger">Account is required</div>
            )}
          </div>
          {/*-------------------Password-------------------*/}
          <div
            className={
              "form-group" + (submitted && !user.password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className="help-block text-danger">Password is required</div>
            )}
          </div>
          {/*-------------------Name-------------------*/}
          <div
            className={
              "form-group" + (submitted && !user.Name ? " has-error" : "")
            }
          >
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              className="form-control"
              name="Name"
              value={user.Name}
              onChange={this.handleChange}
            />
            {submitted && !user.Name && (
              <div className="help-block text-danger">Name is required</div>
            )}
          </div>
          {/*-------------------Gender-------------------*/}
          <div
            className={
              "form-group" + (submitted && !user.Gender ? " has-error" : "")
            }
          >
            <label htmlFor="Gender">Gender</label>
            <div className="col-md-4">
              <input
                type="radio"
                className="radio-inline "
                name="Gender"
                value={1}
                onChange={this.handleChange}
              />
              Male
              <br />
              <input
                type="radio"
                className="radio-inline "
                name="Gender"
                value={2}
                onChange={this.handleChange}
              />
              Female
            </div>
          </div>
          {/*-------------------Countrycode-------------------*/}
          <div
            className={
              "form-group" +
              (submitted && !user.Countrycode ? " has-error" : "")
            }
          >
            <label htmlFor="Countrycode">Countrycode</label>
            <select
              className="form-control"
              name="Countrycode"
              value={user.Countrycodecode}
              onChange={this.handleChange}
            >
              <option value="+886">Taiwan(+886)</option>
              <option value="+1">USA(+1)</option>
              <option value="+44">UK(+44)</option>
              <option value="+86">China(+86)</option>
            </select>
          </div>
          {/*-------------------Number-------------------*/}
          <div
            className={
              "form-group" + (submitted && !user.Number ? " has-error" : "")
            }
          >
            <label htmlFor="Number">Number</label>
            <input
              type="text"
              className="form-control"
              name="Number"
              value={user.Number}
              onChange={this.handleChange}
            />
            {submitted && !user.Number && (
              <div className="help-block text-danger">Number is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            <Link to="/LogIn" className="btn btn-link">
              Login
            </Link>
            <Link to="/" className="btn btn-link">
              back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const registering = state.registration;
  return {
    registering
  };
}

const Regis = withRouter(connect(mapStateToProps)(RegisterPage));

export default Regis;
