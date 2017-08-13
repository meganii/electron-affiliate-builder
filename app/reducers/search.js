// @flow
import { SEARCH_WORD, TOGGLE_MODAL, SHOW_DIALOG, CHANGE_CATEGORY, LOAD, READY, NOTIFY, OPEN_STATUS_BAR, CLOSE_STATUS_BAR } from '../actions/search';

const initialState = {
  category: 'Books',
  searchWord: '',
  open: false,
  index: 0,
  items: [],
  currentPage: 0,
  totalPages: 0,
  indicator: 'hide',
  statusMessage: 'message',
  statusOpen: false,
};

export default function search(state: Object = initialState, action: Object) {
  switch (action.type) {
    case SEARCH_WORD:
      return Object.assign({}, state, {
        searchWord: action.searchWord,
        items: action.items,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        indicator: 'ready',
      });
    case TOGGLE_MODAL:
      return Object.assign({}, state, {open: !state.open});
    case SHOW_DIALOG:
      return Object.assign({}, state, {index: action.index, open: true});
    case CHANGE_CATEGORY:
      return Object.assign({}, state, {category: action.category});
    case LOAD:
      return Object.assign({}, state, {indicator: 'loading'});
    case READY:
      return Object.assign({}, state, {indicator: 'ready'});
    case NOTIFY:
      return Object.assign({}, state, {statusMessage: action.message});
    case OPEN_STATUS_BAR:
      return Object.assign({}, state, {statusMessage: action.message, statusOpen: true});
    case CLOSE_STATUS_BAR:
      return Object.assign({}, state, {statusMessage: action.message, statusOpen: false});
    default:
      return state;
  }
}
