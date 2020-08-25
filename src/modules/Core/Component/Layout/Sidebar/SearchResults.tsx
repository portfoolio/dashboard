import PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const SearchResults: FunctionComponent<any> = (props) => {
  if (!props.matchingResults.length) {
    return <p>Nothing found, keep on searching!</p>;
  }
  return (
    <ul
      style={{
        listStyleType: 'none',
        margin: '16px 0',
        padding: 0,
      }}
    >
      {props.matchingResults.map((result: any) => (
        <li key={result.name} style={{ padding: 8 }}>
          <Link to={result.link} onClick={props.onResultClicked}>
            {result.name}
          </Link>
          <span style={{ display: 'block' }}>{result.description}</span>
        </li>
      ))}
    </ul>
  );
};

SearchResults.propTypes = {
  matchingResults: PropTypes.arrayOf(PropTypes.object),
  onResultClicked: PropTypes.func,
};

export default SearchResults;
