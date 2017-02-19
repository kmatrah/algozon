import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

import { UPDATE_SEARCH } from './actions'

function mapStateToProps({ helper, searchResult }) {
  return searchResult === null ?
    { helper, page: 0, nbPages: 0 } :
    { helper, page: searchResult.page, nbPages: searchResult.nbPages }
}

class PaginationComponent extends Component {
  constructor(props) {
    super(props)
    this.begin = this.begin.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.end = this.end.bind(this)
  }

  begin(e) {
    e.preventDefault()
    this._setPage(0)
  }

  previous(e) {
    e.preventDefault()
    this._setPage(this.props.page - 1)
  }

  next(e) {
    e.preventDefault()
    this._setPage(this.props.page + 1)
  }

  end(e) {
    e.preventDefault()
    this._setPage(this.props.nbPages - 1)
  }

  _setPage(page) {
    let helper = this.props.helper.setPage(page)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
    window.scrollTo(0, 0)
  }

  render() {
    return <div class="pagination">
      <a href className="begin" onClick={this.begin} disabled={this.props.page <= 0}><i className="fa fa-angle-double-left"></i></a>
      <a href className="previous" onClick={this.previous} disabled={this.props.page <= 0}><i className="fa fa-angle-left"></i></a>
      <span className="current-page">{this.props.page + 1} / {this.props.nbPages}</span>
      <a href className="next" onClick={this.next} disabled={this.props.page + 1 >= this.props.nbPages}><i className="fa fa-angle-right"></i></a>
      <a href className="end" onClick={this.end} disabled={this.props.page + 1 >= this.props.nbPages}><i className="fa fa-angle-double-right"></i></a>
    </div>
  }
}

const Pagination = connect(mapStateToProps)(PaginationComponent)

export default Pagination