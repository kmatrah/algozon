import algoliasearchHelper from 'algoliasearch-helper'
import Inferno from 'inferno'
import { Provider, connect } from 'inferno-redux'
import { createStore, combineReducers } from 'redux'
import _ from 'lodash'

import helper from './helper'
import * as reducers from './reducers'
import { UPDATE_RESULT } from './actions'
import Toolbar from './toolbar'
import Search from './search'
import Facets from './facets'
import List from './list'
import Table from './table'
import Grid from './grid'
import Bookmarks from './bookmarks'
import Pagination from './pagination'

const store = createStore(combineReducers(reducers))

helper.on('result', searchResult => {
  store.dispatch({ type: UPDATE_RESULT, searchResult })
})

helper.on('change', state => {
  history.pushState(state, null, `?${algoliasearchHelper.url.getQueryStringFromState(state, { safe: true })}`)
})

window.onpopstate = event => {
  if(event.state) {
    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
  }
}

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Search />
      <Facets />
      <div className="view">
        <Toolbar />
        <List />
        <Table />
        <Grid />
        <Bookmarks />
        <Pagination />
      </div>
    </div>
  </Provider>
)

Inferno.render(<App />, document.querySelector('#app'));

if (location.search.length > 0) {
  helper.overrideStateWithoutTriggeringChangeEvent(algoliasearchHelper.url.getStateFromQueryString(location.search.substr(1)));
}

history.pushState(helper.getState(), null, `?${algoliasearchHelper.url.getQueryStringFromState(helper.getState(), { safe: true })}`)

window.urlHelper = algoliasearchHelper.url
window.helper = helper

helper.search()