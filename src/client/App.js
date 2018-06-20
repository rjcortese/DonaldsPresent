import React, { Component } from "react";
import "./App.css";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = { magicword : null };
    }

    componentDidMount() {
        fetch('/woof')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            this.setState({magicword : myJson.magicword})
        })
    }

    render() {
        return(
            <div className="App">
                {this.state.magicword ? (
                    <h1>Hello {this.state.magicword}</h1>
                ) : (
                    <h1>Loading!</h1>
                )}
            </div>
        );
    }
}

export default App;
