import React, { Component } from "react";
import "./App.css";


class TitleBanner extends Component{
    render() {
        return(
            <div className="TitleBanner">
                <h1>"Donald's Present"</h1>
            </div>
        );
    }
}

class Panel extends Component{
    render() {
        return(
            <div className="Panel">
                {this.props.value}
            </div>
        );
    }
}

class GridTopRow extends Component{
    render() {
        return(
            <div className="GridTopRow">
            <Panel value=""/>
            <Panel value="Kraken"/>
            <Panel value="Bittrex"/>
            <Panel value="Binance"/>
            <Panel value="CoinCap"/>
            <Panel value="Poloniex"/>
            </div>
        );
    }
}

class GridRow extends Component{
    render(){
        return(
            <div className="GridRow">
            <Panel value={this.props.value}/>
            <Panel value="kraken price"/>
            <Panel value="bittrex price"/>
            <Panel value="binance price"/>
            <Panel value="coincap price"/>
            <Panel value="poloniex price"/>
            </div>
        );
    }
}

class Grid extends Component {
    render(){
        return(
            <div className="Grid">
            <GridTopRow/>
            <GridRow value="Huey (Ethereum)"/>
            <GridRow value="Duey (DASH)"/>
            <GridRow value="Luey (Litecoin)"/>
            </div>
        );
    }
}

class App extends Component{
    constructor(props) {
        super(props);
        this.state = { magicword : null };
    }

/*    componentDidMount() {
        fetch('/huey')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            this.setState({magicword : myJson.magicword})
        })
    }
*/
    render() {
        return(
            <div className="App">
            <TitleBanner/>
            <Grid/>
            </div>
        );
    }
}

export default App;
