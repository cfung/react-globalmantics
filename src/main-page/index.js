import React, { Component} from 'react';
import logo from './logo.svg';
import './mainpage.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';
import SearchResults from "../search-results";
import HouseDetail from '../house'

//import * as serviceWorker from './serviceWorker';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

    state = {}

    componentDidMount() {
        this.fetchHouses();
    }

    // or use constructor
    /*constructor(props) {
        super(props);
        this.state = {};

    }*/

    fetchHouses = () => {
        fetch('/houses.json')
            .then(rsp => rsp.json())
            .then(allHouses => {
                this.allHouses = allHouses;
                this.determineFeaturedHouse();
                this.determineUniqueCountries();
            })
    };

    determineFeaturedHouse = () => {

        if (this.allHouses) {
            const randomIndex = Math.floor(Math.random() * this.allHouses.length);
            const featuredHouse = this.allHouses[randomIndex];
            console.log('what is featureHouse: ' + featuredHouse);
            this.setState({featuredHouse});
        };


    };

    determineUniqueCountries = () => {

       const countries = this.allHouses
        ? Array.from(new Set(this.allHouses.map(h => h.country)))
        : [];
       countries.unshift(null); // so that first choice is blank
       this.setState({countries});
    };

    filterHouses = (country) => {
        this.setState({activeHouse: null})
        const filterHouses = this.allHouses.filter((h) => h.country === country);
        this.setState({filterHouses});
        this.setState({country});
    };

    setActiveHouse = (house) => {
        this.setState({activeHouse: house});
    };

    render() {
        let activeComponent = null;

        if (this.state.country)
            activeComponent = <SearchResults country={this.state.country}
            filterHouses={this.state.filterHouses} setActiveHouse={this.setActiveHouse}/>

        if (this.state.activeHouse)
            activeComponent = <HouseDetail house={this.state.activeHouse}/>

        if (!activeComponent)
            activeComponent = <FeaturedHouse house={this.state.featuredHouse}/>

        return (
            <div className="container">
                <Header subtitle={"Providing houses all over the world!!!"}/>
                <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>

                {activeComponent}
            </div>
        );
    }
}

export default App;

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
