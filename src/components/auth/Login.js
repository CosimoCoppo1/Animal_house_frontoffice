import React, { Component } from "react";

class Login extends Component{
    render(){
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form action="/login/password" method="post">
                        <h3>Sign In</h3>
                        <div className="mb-3">
                            <section>
                                <label for="username">Username</label>
                                <input id="username" name="username" type="text" autocomplete="username" required autofocus />
                            </section>
                        </div>
                        <div className="mb-3">
                            <section>
                                <label for="current-password">Password</label>
                                <input id="current-password" name="password" type="password" autocomplete="current-password" required />
                            </section>
                        </div>
                        <div className="mb-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>            
                </div>
            </div>
        )
    }
}

export default Login