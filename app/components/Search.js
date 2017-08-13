// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Search.css';

import ItemList from './ItemList';
import DialogModal from './DialogModal';
import Pagenation from './Pagenation';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Snackbar from 'material-ui/Snackbar';

const RAKUTEN_ID = '10b944e1.69649a36.10b944e2.c5d6d56c';
const YAHOO_SID = '3067752';
const YAHOO_PID = '884189678';
const ASSOC_ID = 'meganii-22';

const style = {
  'backgroundColor': 'white',
  'marginTop': 5,
  'marginBottom': 10,
}

const dropdownStyle = {
  width: 150
}

const indicatorStyle = {
  display: 'inline-block',
  position: 'relative',
};

class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    searchWord: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
  };

  render() {
    const { search, searchWordAsync, toggleModal, showDialog, nextResult, changeCategory, closeStatusBar } = this.props;
    let content;
    if (search.items.length > 0) {
      content = this.buildLinks(search);
    } else {
      content = "選択されていません。";
    }
    let category = search.category;

    return (
      <div>
        <div className={styles.container}>
          <Toolbar style={style}>
            <ToolbarGroup>
              <DropDownMenu style={dropdownStyle} value={search.category} onChange={(e, index, item) => changeCategory(item)}>
                <MenuItem value='All' primaryText="All" />
                <MenuItem value='Books' primaryText="Books" />
                <MenuItem value='Electronics' primaryText="Electronics" />
              </DropDownMenu>
              <TextField type="text" id="inputText" />
              <RaisedButton label="Search" onClick={ () => {
                  const inputText = document.getElementById("inputText");
                  if (inputText != "") {
                    searchWordAsync(category, inputText.value);
                  }
                }}/>
            </ToolbarGroup>
            <ToolbarGroup>
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status={search.indicator}
                style={indicatorStyle}
              />
            </ToolbarGroup>
          </Toolbar>
          <ItemList search={search} onClick={showDialog} />
          <DialogModal search={search} onClick={toggleModal} content={content} />
          <Pagenation search={search} onClickHandler={nextResult} />
          <Snackbar
            open={search.statusOpen}
            message={search.statusMessage}
            autoHideDuration={4000}
            onRequestClose={closeStatusBar}
          />
        </div>
      </div>
    );
  }

  buildLinks(state) {
    const amazonAffiUrl  = this.buildAmazonLink(state);
    const rakutenAffiUrl = this.buildRakutenLink(state);
    const yahooAffiUrl   = this.buildYahooLink(state);
    const item = state.items[state.index];
    const url = this.getImageURL(state);
    const src = url.replace(/http:\/\/ecx\.images-amazon\.com\/images\//, 'https://images-na.ssl-images-amazon.com/images/');
    const content = {
      mix: '<div class="booklink-box">'
              +   '<div class="booklink-image">'
              +     '<a href=' + item.DetailPageURL + ">"
              +       '<img src="' + src + '" />'
              +     '</a>'
              +   '</div>'
              +   '<div class="booklink-info">'
              +     '<div class="booklink-name">'
              +       '<a href="' + amazonAffiUrl + '">'
              +         item.ItemAttributes.Title
              +       '</a>'
              +     '</div>'
              +     '<div class="shoplinkamazon">'
              +       '<a href="' + amazonAffiUrl + '/">Amazonで買う</a>'
              +     '</div>'
              +     '<div class="shoplinkrakuten">'
              +       '<a href="' + rakutenAffiUrl + '">楽天で買う</a>'
              +     '</div>'
              +     '<div class="shoplinkyahoo">'
              +       '<a href="' + yahooAffiUrl + '">Yahoo!で買う</a>'
              +     '</div>'
              +   '</div>'
              + '</div>',
      rakuten: rakutenAffiUrl,
      yahoo: yahooAffiUrl,
      amazon: amazonAffiUrl,
    };

    return content;
  }

  buildAmazonLink(state: Object) {
    const item = state.items[state.index];
    return 'http://www.amazon.co.jp/exec/obidos/asin/' + item.ASIN +'/' + ASSOC_ID + '/';
  }

  buildRakutenLink(state: Object) {
    return 'http://hb.afl.rakuten.co.jp/hgc/'
      + RAKUTEN_ID
      + '/?pc=http://search.rakuten.co.jp/search/mall?sitem='
      + state.searchWord + "&m=http://m.rakuten.co.jp/";
  }

  buildYahooLink(state: Object) {
    return 'http://ck.jp.ap.valuecommerce.com/servlet/referral'
        + '?sid=' + YAHOO_SID
        + '&pid=' + YAHOO_PID
        + '&vc_url=http://search.shopping.yahoo.co.jp/search?p='
        + state.searchWord;
  }

  getImageURL(state: Object) {
    if (state.items[state.index].MediumImage === undefined) {
      return "";
    }
    return state.items[state.index].MediumImage.URL;
  }
}

export default Search;
