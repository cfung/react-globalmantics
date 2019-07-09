import React, { Component} from 'react';
import SearchResultsRows from './search-results-row';

const SearchResults = (props) => {
    const houseRows = props.filterHouses.map(h =>
        <SearchResultsRows key={h.id.toString()} house={h} setActiveHouse={props.setActiveHouse}/>);

    return(
        <div className="mt-2">
            <h4>results for {props.country}:</h4>
            <table className="table table-hover">
                <tbody>
                {houseRows}
                </tbody>
            </table>
        </div>
    );
}

export default SearchResults