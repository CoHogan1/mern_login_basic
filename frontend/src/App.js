import './App.css'
import logo from './logo.png'
import React, { Component } from 'react'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            yes: true,
            reg: false,
            log: false,
        }
    }

    regClick = () => {
        console.log(this.state.reg)
        if (this.state.reg === true) {
            this.setState({
                reg: false
            })
        } else {
            this.setState({
                reg: true
            })
        }
    }

    logClick = () => {
        console.log(this.state.reg)
        if (this.state.reg === true) {
            this.setState({
                reg: false
            })
        } else {
            this.setState({
                reg: true
            })
        }
    }






    render(){
        return(
            <div className="App">
                <div className="welcome">
                    <div className="spacer"></div>
                    <img className="logo" src={logo} alt={logo}/><br></br>
                    <button className="login" >Login</button><br></br>
                    <button className="register" onClick={this.regClick}>Register</button>
                    <div className="spacer"></div>

                </div>

                    {this.state.reg ?
                        <div>
                            <form className="regForm">
                                <label>Name:</label>
                                <input name="name"></input>

                                <label>Username:</label>
                                <input name="username"></input>

                                <label>Email:</label>
                                <input name="email"></input>

                                <label>Password:</label>
                                <input type="password" name="password"></input>


                                <input className="registerButton" type="submit" value="Submit"></input>


                            </form>
                        </div>
                        : null}
            </div>
        )
    }
}

export default App;
