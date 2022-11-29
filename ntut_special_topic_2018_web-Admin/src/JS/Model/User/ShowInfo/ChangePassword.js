import React from "react"
import { ChangePasswordAPI } from "../../Redux/_API/ChangePassword.API"
import { LogOutAPI } from "../../Redux/_API/Logout.API"
import { Link } from "react-router-dom";

class ChangePassword extends React.Component {
    Token = JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountToken;
    constructor(props) {
        super(props);
        this.state = {
            Token: "",
            OldPW: "",
            NewPW: "",
            NewPW2: "",
            Refresh: false
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, console.log(this.state));
        this.setState({ Refresh: true });
        console.log("Password same:", (this.state.NewPW == this.state.NewPW2))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        ChangePasswordAPI(this.Token, this.state.OldPW, this.state.NewPW);
        
    }

    PasswordConfirmed = () => {
        if (this.state.NewPW == this.state.NewPW2) {
            return true
        }
        else
            return false
    }

    render() {
        const { OldPW, NewPW, NewPW2 } = this.state;
        return (
            <div className="container">
                <div className="col-md-5 offset-md-4 main">
                    <form name="form">
                        <div className="form-group">
                            <label>Old Password</label>
                            <input
                                type="text"
                                className="form-control"
                                name="OldPW"
                                value={OldPW}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="text"
                                className="form-control"
                                name="NewPW"
                                value={NewPW}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Comfirm New Password</label>
                            <input
                                type="text"
                                className="form-control"
                                name="NewPW2"
                                value={NewPW2}
                                onChange={this.handleChange}
                            />
                        </div>
                        <a className="btn btn-primary" onClick={this.handleSubmit} href="#">
                            send
                        </a>
                        <Link to="/ShowInfo" className="btn btn-link">
                            Back
                        </Link>

                        {!(this.state.NewPW == this.state.NewPW2) && this.state.Refresh && (
                            <div className="help-block text-danger" >
                                Comfirm Password doesn't Match
                            </div>
                        )}
                    </form>
                </div>
            </div>)

    }
}

export default ChangePassword;