import React, { Component } from "react";

class SignUp extends Component{
    render(){
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form action="/register" method="post">
                        <h3>Sign Up</h3>
                        <div className="mb-3">
                            <section>
                                <label for="username">Username</label>
                                <input id="username" name="username" type="text" autocomplete="username" required />
                            </section>                        
                        </div>
                        <div className="mb-3">
                            <section>
                                <label for="new-password">Password</label>
                                <input id="new-password" name="password" type="password" autocomplete="new-password" required />
                            </section>                        
                        </div>
                        <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Sign Up
                        </button>
                        </div>
                        <p className="forgot-password text-right">
                        Already registered <a href="/sign-in">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp