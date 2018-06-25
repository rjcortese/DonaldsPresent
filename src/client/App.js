import React, { Component } from "react";
import "./App.css";


class TitleBanner extends Component{
    render() {
        return(
            <div className="TitleBanner">
                <h1>{"Donald's Present"}</h1>
            </div>
        );
    }
}

class Panel extends Component{
    render() {
        return(
            <div className="Panel" highlight={this.props.highlight}>
                {this.props.value}
            </div>
        );
    }
}

class GridTopRow extends Component{
    render() {
        return(
            <div className="GridTopRow">
            <Panel value="Exchange:"/>
            <Panel value="Kraken"/>
            <Panel value="Bittrex"/>
            <Panel value="Binance"/>
            <Panel value="CoinCap"/>
            <Panel value="Poloniex"/>
            </div>
        );
    }
}

class GridHueyRow extends Component{
    constructor(props){
        super(props);

        this.state = {  
            kraken: {
                rate: null,
                converted: null
            },
            bittrex: {
                rate: null,
                converted: null
            },
            binance: {
                rate: null,
                converted: null
            },
            coincap: {
                rate: null,
                converted: null
            },
            poloniex: {
                rate: null,
                converted: null
            },
            best: null
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            fetch('/huey')
                .then((res) => {
                    return res.json();
                })
                .then((myjson) => {
                    console.log(myjson);
                    this.setState(myjson);
                })
                .catch((err) => console.log(err));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render(){
        return(
            <div className="GridHueyRow">
            <Panel value="Huey (Ethereum)"/>
            <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
            <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
            <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
            <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
            <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
            </div>
        );
    }
}

class GridDueyRow extends Component{
    constructor(props){
        super(props);

        this.state = {  
            kraken: {
                rate: null,
                converted: null
            },
            bittrex: {
                rate: null,
                converted: null
            },
            binance: {
                rate: null,
                converted: null
            },
            coincap: {
                rate: null,
                converted: null
            },
            poloniex: {
                rate: null,
                converted: null
            },
            best: null
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            fetch('/duey')
                .then((res) => {
                    return res.json();
                })
                .then((myjson) => {
                    console.log(myjson);
                    this.setState(myjson);
                })
                .catch((err) => console.log(err));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render(){
        return(
            <div className="GridDueyRow">
            <Panel value="Duey (DASH)"/>
            <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
            <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
            <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
            <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
            <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
            </div>
        );
    }
}

class GridLueyRow extends Component{
    constructor(props){
        super(props);

        this.state = {  
            kraken: {
                rate: null,
                converted: null
            },
            bittrex: {
                rate: null,
                converted: null
            },
            binance: {
                rate: null,
                converted: null
            },
            coincap: {
                rate: null,
                converted: null
            },
            poloniex: {
                rate: null,
                converted: null
            },
            best: null
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            fetch('/luey')
                .then((res) => {
                    return res.json();
                })
                .then((myjson) => {
                    this.setState(myjson);
                })
                .catch((err) => console.log(err));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render(){
        return(
            <div className="GridLueyRow">
            <Panel value="Luey (Litecoin)"/>
            <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
            <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
            <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
            <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
            <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
            </div>
        );
    }
}

class Grid extends Component {
    render(){
        return(
            <div className="Grid">
            <GridTopRow/>
            <GridHueyRow/>
            <GridDueyRow/>
            <GridLueyRow/>
            </div>
        );
    }
}

class App extends Component{
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
