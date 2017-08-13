// @flow
export const SEARCH_WORD = 'SEARCH_WORD';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SHOW_DIALOG = 'SHOW_DIALOG';
export const NEXT_RESULT = 'NEXT_RESULT';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const LOAD = 'LOAD';
export const READY = 'READY';
export const NOTIFY = 'NOTIFY';
export const CLOSE_STATUS_BAR = 'CLOSE_STATUS_BAR';
export const OPEN_STATUS_BAR = 'OPEN_STATUS_BAR';

import {opHelper} from '../config/apac';

export function searchWord(searchWord, itemSearchResponse, currentPage) {
  return {
    type: SEARCH_WORD,
    searchWord: searchWord,
    items: itemSearchResponse.Items.Item,
    currentPage: currentPage,
    totalPages: itemSearchResponse.Items.TotalPages,
  };
}

export function searchWordAsync(category = 'All', word, itemPage = 1) {
  return (dispatch: Function) => {
    dispatch(load());
    opHelper.execute('ItemSearch', {
      'SearchIndex': category,
      'Keywords': word,
      'ResponseGroup': 'Images,ItemAttributes,Offers',
      'ItemPage': itemPage
    }).then((response) => {
      if (response.result.hasOwnProperty("ItemSearchResponse")) {
        dispatch(searchWord(word, response.result.ItemSearchResponse, itemPage));
      } else {
        dispatch(openStatusBar('please retry...'));
      }
    }).catch((err) => {
      console.error("Something went wrong! ", err);
      dispatch(openStatusBar('please retry...'));
    });
  };
}

export function notify(message) {
  return { type: NOTIFY, message: message }
}

export function toggleModal() {
  return { type: TOGGLE_MODAL }
}

export function showDialog(index) {
  return { type: SHOW_DIALOG, index: index }
}

export function nextResult(category, word, index) {
  return (dispatch: Function) => {
    dispatch(load());
    dispatch(searchWordAsync(category, word, index));
  }
}

export function changeCategory(category) {
  return { type: CHANGE_CATEGORY, category: category}
}

export function load() {
  return { type: LOAD }
}

export function ready() {
  return { type: READY }
}

export function openStatusBar(message = "") {
  return { type: OPEN_STATUS_BAR, message: message}
}

export function closeStatusBar(message = "") {
  return { type: CLOSE_STATUS_BAR, message: message }
}
