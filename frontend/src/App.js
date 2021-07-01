import './App.css'
import logo from './logo.png'
import React, { Component } from 'react'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            reg: false,
            log: false,
            name: '',
            username: '',
            emal: '',
            password: '',
            password2: '',
            allUsers: [],
            showUsers: false,
            err: [],
            fail: false,
        }
    }

    handleChange = (event) => {
        //console.log(event.target.value)
        this.setState({
          [event.target.name]: event.target.value
        })
    }

    regClick = () => {
        //console.log(this.state.reg)
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
        //console.log(this.state.log)
        if (this.state.log === true) {
            this.setState({
                log: false
            })
        } else {
            this.setState({
                log: true
            })
        }
    }

    regSubmit = async (event) => {
        event.preventDefault()
        const url = "http://localhost:3001/users/register"
        try{
            const registerResponse = await fetch (url, {
                //credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    name:     event.target.name.value,
                    username: event.target.username.value,
                    email:    event.target.email.value,
                    password: event.target.password.value,
                    password2: event.target.password.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedResponse =  await registerResponse.json()
            if (registerResponse.status === 200){
                this.setState({
                    reg: false,
                })
            }
            if(registerResponse.status !== 201){
                console.log(registerResponse)
                this.setState({
                    err: parsedResponse.error,
                })
            }
        }
        catch(err){
            console.log("Error => ", err) // login error handeling goes here.
        }
        //console.log(this.state.err)
    }

    logSubmit = async (event) => {
        event.preventDefault()
        const url = "http://localhost:3001/users/login"
        console.log(url)
        try{
            const registerResponse = await fetch (url, {
                //credentials: 'include',
                method: 'GET',
                body: JSON.stringify({
                    name:     event.target.name.value,
                    username: event.target.username.value,
                    email:    event.target.email.value,
                    password: event.target.password.value,
                    password2: event.target.password.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const parsedResponse =  await registerResponse.json()
            console.log(parsedResponse)
            if (registerResponse.status === 201){
                this.setState({
                    log: false,
                })
                console.log("Successful login")
            }
        }
        catch(err){
            console.log("Error => ", err)
        }


    }






    render(){
        return(
            <div className="App">
            <div className="welcome">
                <div className="spacer"></div>
                <img className="logo" src={logo} alt={logo}/><br></br>
                <button className="login"    onClick={this.logClick} >Login</button><br></br>
                <button className="register" onClick={this.regClick}>Register</button>
                <div className="spacer"></div>

            </div>

            {this.state.fail?
            <div>
                <ol className="error">{this.state.err.forEach(e=>{
                        return(
                            <li>{e.msg}</li>
                        )
                    })}
                </ol>
            </div> : null}

            {this.state.reg ?
                <div>
                    <form className="regForm" onSubmit={this.regSubmit}>
                        <label>Name:</label>
                        <input name="name" value={this.state.name} placeholder="Any name" onChange={this.handleChange}></input>

                        <label>Username:</label>
                        <input name="username" value={this.state.username} placeholder="Any username"  onChange={this.handleChange}></input>

                        <label>Email:</label>
                        <input name="email" type="email" value={this.state.email} placeholder="example@email.com" onChange={this.handleChange}></input>

                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} placeholder="at least 6 characters" onChange={this.handleChange}></input>

                        <label>Password2:</label>
                        <input type="password" name="password2" value={this.state.password2} placeholder="must match first password" onChange={this.handleChange}></input>



                        <input className="registerButton" type="submit" value="Submit"></input>


                    </form>
                </div>
                : null}

                {this.state.log ?
                    <div>
                    <form className="logForm" onSubmit={this.logSubmit}>
                        <label>Name:</label>
                        <input name="name"></input>

                        <label>Username:</label>
                        <input name="username"></input>

                        <label>Email:</label>
                        <input name="email"></input>

                        <label>Password:</label>
                        <input type="password" name="password"></input>


                        <input className="loginButton" type="submit" value="Login"></input>


                    </form>
                    </div> : null}

                    {this.state.showUsers ?
                    <div>
                        <table>
                        <tbody>
                            { this.state.users.map(user => {
                                return(
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.password2}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                    </div>
                    : null}
            </div>
        )
    }
}

export default App;
