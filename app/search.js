import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

import { UPDATE_SEARCH } from './actions'

function mapStateToProps({ helper }) {
  return { helper, query: helper.getQueryParameter("query") }
}

class SearchComponent extends Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this);
  }

  search(e) {
    e.preventDefault()
    let helper = this.props.helper.setQuery(e.target.value)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  render() {
    return <div class="search">
      <i className="fa fa-search"></i>
      <input autofocus type="text" value={this.props.query} className="search-input" placeholder="Search for apps" onInput={this.search} />
    </div>
  }
}

const Search = connect(mapStateToProps)(SearchComponent)

export default Search