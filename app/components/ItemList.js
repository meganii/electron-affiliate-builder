// @flow
import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1024,
    height: 600,
    overflowY: 'auto',
  },
};

class ItemList extends Component {

  render() {
    const { search, onClick } = this.props;
    return (
      <div>
        <div style={styles.root}>
          <GridList cellHeight={180} cols={3} style={styles.gridList}>
            {search.items.map ( (item, index) =>
              <GridTile
                key={index}
                title={item.ItemAttributes.Title}
                subtitle={<span>by <b>{item.ItemAttributes.Author}</b> {this.getPrice(item)}</span>}
                actionIcon={<IconButton onClick={ () => {onClick(index)} }><StarBorder color="white" /></IconButton>}
              >
                <img src={this.getImage(item)} />
              </GridTile>
            )}
          </GridList>
        </div>
      </div>
    );
  }

  getPrice(item) {
    if (item.ItemAttributes.hasOwnProperty("ListPrice")) {
      return item.ItemAttributes.ListPrice.FormattedPrice;
    }
    return "";
  }

  getImage(item) {
    if (item.hasOwnProperty("LargeImage")){
      return item.LargeImage.URL;
    }
    return "";
  }
}
export default ItemList;
