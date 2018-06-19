import React, { Component } from "react";
import "./App.css";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = { username: null };
    }

    componentDidMount() {
        fetch('/')
        .then(res => res.json())
        .then(user => this.setState({username: user.username}));
    }

    render() {
        return(
            <div className="App">
                {this.state.username ? (
                    <h1>Hello {this.state.username}</h1>
                ) : (
                    <h1>Loading!</h1>
                )}
            </div>
        );
    }
}

export default App;
