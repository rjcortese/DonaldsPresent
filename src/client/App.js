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

        this.hueyAddress = null;
        fetch('/huey/address')
            .then((res) => {
                return res.json();
            })
            .then((myjson) => {
                this.hueyAddress = myjson.address;
            })
            .catch((err) => console.log(err));

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
        if (this.props.convertedView) {
            return(
                <div className="GridHueyRow">
                <Panel value={"Huey (Ethereum)\nAddress: " + this.hueyAddress}/>
                <Panel value={this.state.kraken.converted} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.converted} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.converted} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.converted} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.converted} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        } else {
            return(
                <div className="GridHueyRow">
                <Panel value={"Huey (Ethereum)\nAddress: " + this.hueyAddress}/>
                <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        }
    }
}

class GridDueyRow extends Component{
    constructor(props){
        super(props);

        this.dueyAddress = null;
        fetch('/duey/address')
            .then((res) => {
                return res.json();
            })
            .then((myjson) => {
                this.dueyAddress = myjson.address;
            })
            .catch((err) => console.log(err));

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
        if (this.props.convertedView) {
            return(
                <div className="GridDueyRow">
                <Panel value={"Duey (DASH)\nAddress: " + this.dueyAddress}/>
                <Panel value={this.state.kraken.converted} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.converted} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.converted} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.converted} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.converted} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );

        } else {
            return(
                <div className="GridDueyRow">
                <Panel value={"Duey (DASH)\nAddress: " + this.dueyAddress}/>
                <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        }
    }
}

class GridLueyRow extends Component{
    constructor(props){
        super(props);

        this.lueyAddress = null;
        fetch('/luey/address')
            .then((res) => {
                return res.json();
            })
            .then((myjson) => {
                this.lueyAddress = myjson.address;
            })
            .catch((err) => console.log(err));

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
        if (this.props.convertedView) {
            return(
                <div className="GridLueyRow">
                <Panel value={"Luey (Litecoin)\nAddress: " + this.lueyAddress}/>
                <Panel value={this.state.kraken.converted} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.converted} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.converted} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.converted} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.converted} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        } else {
            return(
                <div className="GridLueyRow">
                <Panel value={"Luey (Litecoin)\nAddress: " + this.lueyAddress}/>
                <Panel value={this.state.kraken.rate} highlight={(this.state.best === "kraken").toString()}/>
                <Panel value={this.state.bittrex.rate} highlight={(this.state.best === "bittrex").toString()}/>
                <Panel value={this.state.binance.rate} highlight={(this.state.best === "binance").toString()}/>
                <Panel value={this.state.coincap.rate} highlight={(this.state.best === "coincap").toString()}/>
                <Panel value={this.state.poloniex.rate} highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        }
    }
}

class Grid extends Component {
    render(){
        return(
            <div className="Grid">
            <GridTopRow/>
            <GridHueyRow convertedView={this.props.convertedView}/>
            <GridDueyRow convertedView={this.props.convertedView}/>
            <GridLueyRow convertedView={this.props.convertedView}/>
            </div>
        );
    }
}

class App extends Component{
    constructor(props) {
        super(props);

        this.state = { convertedView: false };
        this.toggleView = this.toggleView.bind(this);
    }

    toggleView() {
        this.setState(prevState => ({
            convertedView: !prevState.convertedView
        }));
    }

    render() {
        return(
            <div className="App">
            <TitleBanner/>
            <Grid convertedView={this.state.convertedView}/>
            <button className="ToggleButton" onClick={this.toggleView}>
            {this.state.convertedView ? 'Display Exchange Rates' : 'Display Value of 5 Bitcoin'}
            </button>
            </div>
        );
    }
}

export default App;
