import React from "react";
import axios from "axios";
import './CryptoCurrencyList.css';

class CryptoCurrencyList extends React.Component {
    state = {coins: []};

    getCoins = async () => {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        })
        this.setState({coins: response.data});
    }

    componentDidMount() {
        setInterval(() => {
            this.getCoins();
        }, 1000);
    }

    convertToPercent(value) {
        return value.toFixed(2);
    }

    getPriceChangePercentageClass(value){
        return value > 0 ? 'green' : 'red' ;
    }

    render() {
        const coins = this.state.coins.map(coin => {
            return (
                <tr>
                    <td data-label="#">{coin.market_cap_rank}</td>
                    <td data-label="Name"><img className="coin logo" src={coin.image}/> {coin.name}</td>
                    <td data-label="Symbol">{coin.symbol.toUpperCase()}</td>
                    <td data-label="Price">${coin.current_price}</td>
                    <td data-label="24h" className={this.getPriceChangePercentageClass(coin.price_change_percentage_24h)}>{this.convertToPercent(coin.price_change_percentage_24h)}%</td>
                    <td data-label="Market Cap">{coin.market_cap}</td>
                    <td data-label="Volume">{coin.total_volume}</td>
                </tr>
            )
        })
        return (
            <div>
                <h2>Today's Cryptocurrency Prices by Market Cap</h2>
                <table className="ui celled table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Token Symbol</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coins}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CryptoCurrencyList;