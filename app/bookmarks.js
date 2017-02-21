import algoliasearchHelper from 'algoliasearch-helper'
import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

import { UPDATE_SEARCH, SELECT_MODE, SET_BOOKMARKS } from './actions'

function mapStateToProps({ helper, facetToggler, viewMode, bookmarks }) {
  return { facetToggler, helper, viewMode, bookmarks }
}

class Bookmark extends Component {
  load(e) {
    e.preventDefault()
    this.props.helper.setState(algoliasearchHelper.url.getStateFromQueryString(this.props.bookmark.state))
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: this.props.helper })
    this.context.store.dispatch({ type: SELECT_MODE, mode: 'list' })
    this.props.helper.search()
  }

  delete(e) {
    e.preventDefault()
    let bookmarks = _.compact(this.props.bookmarks.map(b => b.name === this.props.bookmark.name ? null : b))
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    this.context.store.dispatch({ type: SET_BOOKMARKS, bookmarks })
  }

  render() {
    return <li>
      <a href onClick={e => this.load(e) }>
        <i className="fa fa-caret-right"></i> {this.props.bookmark.name}
      </a>
      <a className="bookmark-delete" href onClick={e => this.delete(e)}>
        <i className="fa fa-trash"></i>
      </a>
    </li>
  }
}

class BookmarksContainer extends Component {
  constructor(props) {
    super(props)
    this.save = this.save.bind(this)
  }

  save(e) {
    e.preventDefault()
    if(e.target.value.length > 0) {
      let encodedState = algoliasearchHelper.url.getQueryStringFromState(this.props.helper.getState(), { safe: true })
      let bookmarks = this.props.bookmarks.concat({ name: e.target.value, state: encodedState })
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
      this.context.store.dispatch({ type: SET_BOOKMARKS, bookmarks})
    }
  }

  render() {
    if(this.props.viewMode === 'bookmarks') {
      return <div className={`bookmarks ${this.props.facetToggler}`}>
        <div class="notice">
          You can save here your current search. Just give it a name and re-use it later!
        </div>
        <input type="text" placeholder="Type in the bookmark name and press enter" onChange={this.save} />
        { this.props.bookmarks.length === 0 ?
          <p>You haven't saved any bookmarks</p> :
          <p>Your bookmarks :</p>
        }
        <ul>
          { this.props.bookmarks.map((bookmark, i) => (
            <Bookmark bookmark={bookmark} bookmarks={this.props.bookmarks} helper={this.props.helper} />
          ))}
        </ul>
      </div>
    }
  }
}

const Bookmarks = connect(mapStateToProps)(BookmarksContainer)

export default Bookmarks