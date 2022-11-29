import React from "react";
import { UpdateUserAPI } from "../../Redux/_API/UpdateUser.ApI";
import { Link } from "react-router-dom";

class ShowInfoPage extends React.Component {
  Info = JSON.parse(localStorage.getItem("Info"));
  constructor(props) {
    super(props);
    /* ========================================*/
    this.state = {
      Account: JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountID,
      Token: JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountToken,
      Name: this.Info.data.GetUser.Profile.Name,
      Gender: this.Info.data.GetUser.Profile.Gender,
      Countrycode: this.Info.data.GetUser.Profile.Phone.CountryNumber,
      Number: this.Info.data.GetUser.Profile.Phone.PhoneNumber,
      Edit: false
    };
    console.log(this.state);
    /* ========================================*/
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startEdit = this.startEdit.bind(this);
  }
  /* ========================================*/
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name, ":", value);
  }
  /* ========================================*/
  handleSubmit(event) {
    console.log(this.state);
    const user = {
      Name: this.state.Name,
      Gender: this.state.Gender,
      Countrycode: this.state.Countrycode,
      Number: this.state.Number
    };
    this.startEdit();
    UpdateUserAPI(this.state.Token, this.state.Account, user);
  }
  /* ========================================*/
  startEdit() {
    this.setState({ Edit: !this.state.Edit });
  }
  /* ========================================*/
  render() {
    /* ========================================*/
    const { Account, Name, Gender, Countrycode, Number } = this.state;
    /* ========================================*/
    const UpdateBotton = (
      <div className="btn btn-primary" href="/" onClick={this.handleSubmit}>
        Update
      </div>
    );
    return (
      <div className="container">
        <div className="col-md-5 offset-md-4 main">
          <h2 className="offset-md-5">AcountInfo</h2>
          <form name="form">
            {/*--------------------------------------------------*/}
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="Account"
                value={Account}
                onChange={this.handleChange}
                disabled="True"
              />
            </div>
            {/*--------------------------------------------------*/}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="Name"
                value={Name}
                onChange={this.handleChange}
                disabled={!this.state.Edit}
              />
            </div>
            {/*--------------------------------------------------*/}
            <div className="form-group">
              <label>Gender</label>
              <div className="col-md-4">
                <input
                  type="radio"
                  className="radio-inline "
                  name="Gender"
                  value={1}
                  onChange={this.handleChange}
                  checked={this.state.Gender == 1}
                  disabled={!this.state.Edit}
                />
                Male
                <br />
                <input
                  type="radio"
                  className="radio-inline "
                  name="Gender"
                  value={2}
                  onChange={this.handleChange}
                  checked={this.state.Gender == 2}
                  disabled={!this.state.Edit}
                />
                Female
              </div>
            </div>
            {/*--------------------------------------------------*/}
            <div className="form-group">
              <label>Country code</label>
              <select
                className="form-control"
                name="Countrycode"
                value={this.state.Countrycodecode}
                onChange={this.handleChange}
                disabled={!this.state.Edit}
              >
                <option value="+886">Taiwan(+886)</option>
                <option value="+1">USA(+1)</option>
                <option value="+44">UK(+44)</option>
                <option value="+86">China(+86)</option>
              </select>
            </div>
            {/*--------------------------------------------------*/}
            <div className="form-group">
              <label>Number</label>
              <input
                type="text"
                className="form-control"
                name="Number"
                value={Number}
                onChange={this.handleChange}
                disabled={!this.state.Edit}
              />
            </div>
            {/* ========================================*/}
            <div className="btn btn-primary" onClick={this.startEdit}>
              {!this.state.Edit ? "Edit" : "Cancel"}
            </div>
            {/* ========================================*/}
            {!this.state.Edit ? "" : UpdateBotton}
            {/* ========================================*/}
            <Link to="/ChangePassword" className="btn btn-link">
            Change Password
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default ShowInfoPage;
