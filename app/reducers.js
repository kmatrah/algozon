import searchHelper from './helper'
import { UPDATE_SEARCH, UPDATE_RESULT, SELECT_MODE, SET_BOOKMARKS } from './actions'

export const helper = (state = searchHelper, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.helper
    default:
      return state
  }
}

export const searchResult = (state = null, action) => {
  switch (action.type) {
    case UPDATE_RESULT:
      return action.searchResult
    default:
      return state
  }
}

export const viewMode = (state = 'list', action) => {
  switch (action.type) {
    case SELECT_MODE:
      return action.mode
    default:
      return state
  }
}

export const bookmarks = (state = JSON.parse(localStorage.getItem("bookmarks") || "[]"), action) => {
  switch (action.type) {
    case SET_BOOKMARKS:
      return action.bookmarks
    default:
      return state
  }
}