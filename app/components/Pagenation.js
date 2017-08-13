// @flow
import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 5,
};

const pagenationStyle = {
  "marginTop": 5
}

const MAX_PAGE_ALL = 5;
const MAX_PAGE = 10;

class Pagenation extends Component {
  render() {
    const { search, onClickHandler } = this.props;
    const pages = this.getPages();
    console.log(pages);
    return (
      <div>
        <div style={pagenationStyle}>
        {[...Array(pages)].map( (x, i) =>
          <RaisedButton key={i} label={i+1} style={style}
            primary={this.getCurrentPage(i+1, search.currentPage)}
            onClick={() => {
              onClickHandler(search.category, search.searchWord, i+1);
            }}/>
        )}
        </div>
      </div>
    );
  }

  getCurrentPage(index: number, current: number) {
    if (index == current) {
      return true;
    }
    return false;
  }

  getPages() {
    const { search } = this.props;
    if (search.category == 'All') {
      return search.totalPages > MAX_PAGE_ALL ? MAX_PAGE_ALL : search.totalPages;
    } else {
      return search.totalPages > MAX_PAGE ? MAX_PAGE : search.totalPages;
    }
  }
}

export default Pagenation;
