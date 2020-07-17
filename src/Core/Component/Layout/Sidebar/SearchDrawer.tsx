import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchResults from './SearchResults';

const items = [
  { name: 'Order Map', link: '/order/map', description: 'Order Map Management.', key: 'order-map' },
  { name: 'Order Center', link: '/order/center', description: 'Order Center Management.', key: 'order-center-key' },
  { name: 'Order Gift', link: '/gift', description: 'Order Gift Management.', key: 'order-gift' },
  { name: 'Order Restaurant', link: '/restaurant/item', description: 'Order Restaurant Management.' },
  { name: 'Order Restaurant Tag', link: '/restaurant/tag', description: 'Order Restaurant Tag Management.' },
  { name: 'Order Drink Item', link: '/drink/item', description: 'Order Drink Item Management.' },
  { name: 'Order Drink Category', link: '/drink/category', description: 'Order Drink Category Management.' },

  { name: 'Concierge Center', link: '/concierge/center', description: 'Concierge Center Management.' },
  { name: 'Concierge Reservation', link: '/reservation-builder', description: 'Concierge Reservation Builder Management.' },
  { name: 'Concierge Trip Planning', link: '/trip-planning-builder', description: 'Concierge Trip Planning Builder Management.' },
  { name: 'Concierge Personal Service', link: '/service-item', description: 'Concierge Personal Service Items Management.' },

  { name: 'Concierge Renting Type', link: '/renting-type', description: 'Concierge Renting Type Management.' },
  { name: 'Concierge Renting Subtype', link: '/renting-subtype', description: 'Concierge Renting Subtype Management.' },

  { name: 'Site Page', link: '/page', description: 'Site Page Management.' },
  { name: 'Site Blog', link: '/blog', description: 'Site Blog Management.' },
  { name: 'Site Section Item', link: '/section/item', description: 'Site Section Item Management.' },
  { name: 'Site Section Category', link: '/section/category', description: 'Site Section Category Management.' },

  { name: 'Partner Item', link: '/partner-item', description: 'Partner Item Management.' },
  { name: 'Partner Type', link: '/partner-type', description: 'Partner Type Management.' },

  { name: 'Account Dispatcher', link: '/dispatcher', description: 'Dispatcher Account Management.' },

];

export default class SearchDrawer extends Component<any, any> {
  public searchInput: any;

  static propTypes = {
    onResultClicked: PropTypes.func,
    onSearchInputRef: PropTypes.func,
  };

  state = {
    searchString: '',
    results: items,
  };

  filterChange = () => {
    this.setState({
      searchString: this.searchInput.value,
    });
  }

  searchResults = () => {
    const {results, searchString} = this.state;

    const matchingResults = results.filter(
      (c: any) => (
        c.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0 ||
        (c.description && c.description.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
      ),
    ).slice(0, 10);

    return (
      <SearchResults
        matchingResults={matchingResults}
        onResultClicked={() => {
          this.props.onResultClicked();
          this.searchInput.value = '';
          this.filterChange();
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <input
          type={'text'}
          placeholder="Search..."
          onKeyUp={this.filterChange}
          ref={el => {
            this.searchInput = el;
            if (this.props.onSearchInputRef) {
              this.props.onSearchInputRef(el);
            }
          }}
          style={{
            border: 'none',
            display: 'block',
            fontSize: 24,
            fontWeight: 200,
            outline: 'none',
            padding: '0 0 0 12px',
          }}
        />
        { this.searchResults() }
      </div>
    );
  }
}
