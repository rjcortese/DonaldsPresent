import React, { Component } from "react";
import "./App.css";


class TitleBanner extends Component{
    render() {
        return(
            <div className="TitleBanner">
                <h1>{"Donald's Present"}</h1>
                <p>{this.props.convertedView ? "The Value of 5 Bitcoin" : "Exchange Rates"}</p>
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


class ChildInfoPanel extends Component{
    render() {
        return(
            <div className="CIPanel">
                <div>{this.props.name}</div>
                <div>Bitcoin Address: {this.props.address}</div>
            </div>
        );
    }
}


class DataPanel extends Component{
    render() {
        return(
            <div className="DPanel" highlight={this.props.highlight}>
                {this.props.value} {this.props.units}
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


function ExchangeInfo() {
    this.rate = null;
    this.converted = null;
}


function GridRowStateObject() {
    this.kraken = new ExchangeInfo();
    this.bittrex = new ExchangeInfo();
    this.binance = new ExchangeInfo();
    this.coincap = new ExchangeInfo();
    this.poloniex = new ExchangeInfo();
    this.best = null;
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

        this.state = new GridRowStateObject();
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
                <ChildInfoPanel name={"Huey (wants Ethereum)"}  address={this.hueyAddress}/>
                <DataPanel value={this.state.kraken.converted} units="ETH" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.converted} units="ETH" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.converted} units="ETH" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.converted} units="ETH" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.converted} units="ETH" highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        } else {
            return(
                <div className="GridHueyRow">
                <ChildInfoPanel name={"Huey (wants Ethereum)"}  address={this.hueyAddress}/>
                <DataPanel value={this.state.kraken.rate} units="BTC per ETH" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.rate} units="BTC per ETH" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.rate} units="BTC per ETH" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.rate} units="BTC per ETH" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.rate} units="BTC per ETH" highlight={(this.state.best === "poloniex").toString()}/>
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

        this.state = new GridRowStateObject();
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
                <ChildInfoPanel name={"Duey (wants DASH)"} address={this.dueyAddress}/>
                <DataPanel value={this.state.kraken.converted} units="DASH" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.converted} units="DASH" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.converted} units="DASH" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.converted} units="DASH" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.converted} units="DASH" highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );

        } else {
            return(
                <div className="GridDueyRow">
                <ChildInfoPanel name={"Duey (wants DASH)"} address={this.dueyAddress}/>
                <DataPanel value={this.state.kraken.rate} units="BTC per DASH" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.rate} units="BTC per DASH" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.rate} units="BTC per DASH" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.rate} units="BTC per DASH" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.rate} units="BTC per DASH" highlight={(this.state.best === "poloniex").toString()}/>
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

        this.state = new GridRowStateObject();
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
                <ChildInfoPanel name={"Luey (wants Litecoin)"} address={this.lueyAddress}/>
                <DataPanel value={this.state.kraken.converted} units="LTC" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.converted} units="LTC" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.converted} units="LTC" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.converted} units="LTC" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.converted} units="LTC" highlight={(this.state.best === "poloniex").toString()}/>
                </div>
            );
        } else {
            return(
                <div className="GridLueyRow">
                <ChildInfoPanel name={"Luey (wants Litecoin)"} address={this.lueyAddress}/>
                <DataPanel value={this.state.kraken.rate} units="BTC per LTC" highlight={(this.state.best === "kraken").toString()}/>
                <DataPanel value={this.state.bittrex.rate} units="BTC per LTC" highlight={(this.state.best === "bittrex").toString()}/>
                <DataPanel value={this.state.binance.rate} units="BTC per LTC" highlight={(this.state.best === "binance").toString()}/>
                <DataPanel value={this.state.coincap.rate} units="BTC per LTC" highlight={(this.state.best === "coincap").toString()}/>
                <DataPanel value={this.state.poloniex.rate} units="BTC per LTC" highlight={(this.state.best === "poloniex").toString()}/>
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
            <TitleBanner convertedView={this.state.convertedView}/>
            <Grid convertedView={this.state.convertedView}/>
            <button className="ToggleButton" onClick={this.toggleView}>
            {this.state.convertedView ? 'Display Exchange Rates' : 'Display Value of 5 Bitcoin'}
            </button>
            </div>
        );
    }
}

export default App;
