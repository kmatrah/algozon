import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

import { UPDATE_SEARCH, SELECT_MODE } from './actions'
import { INDEX_NAME, INDEX_NAME_REVERSE } from './config'

function mapStateToProps({ helper, searchResult, viewMode }) {
  return searchResult === null ?
    { helper, viewMode, currentIndex: helper.getIndex(), nbHits: 0, time: 0 } :
    { helper, viewMode, currentIndex: helper.getIndex(), nbHits: searchResult.nbHits, time: searchResult.processingTimeMS }
}

class Sort extends Component {
  toggleSort(e) {
    e.preventDefault()
    let helper = this.props.helper.setIndex(this.props.currentIndex === INDEX_NAME ? INDEX_NAME_REVERSE : INDEX_NAME)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  render() {
    return <a href onClick={e => this.toggleSort(e)} className="sort">
      { ' - ' }
      {this.props.currentIndex === INDEX_NAME ? 'Highest rank' : 'Lowest rank'}{' '}
      {this.props.currentIndex === INDEX_NAME ?
        <i className="fa fa-caret-down"></i> :
        <i className="fa fa-caret-up"></i>
      }
    </a>
  }
}

class ViewModes extends Component {
  selectMode(mode, e) {
    e.preventDefault()
    this.context.store.dispatch({ type: SELECT_MODE, mode: mode })
  }

  render() {
    return <div class="view-modes">
      <a href className={this.props.viewMode === 'list' ? 'active': ''} onClick={e => this.selectMode('list', e)}>
        <i className="fa fa-list"></i>
      </a>
      <a href className={this.props.viewMode === 'table' ? 'active': ''} onClick={e => this.selectMode('table', e)}>
        <i className="fa fa-table"></i>
      </a>
      <a href className={this.props.viewMode === 'grid' ? 'active': ''} onClick={e => this.selectMode('grid', e)}>
        <i className="fa fa-th"></i>
      </a>
      <a href className={this.props.viewMode === 'bookmarks' ? 'active': ''} onClick={e => this.selectMode('bookmarks', e)}>
        <i className="fa fa-bookmark-o"></i>
      </a>
    </div>
  }
}

class ToolbarContainer extends Component {
  render() {
    return <div className="toolbar">
      <span className="total-hits">{this.props.nbHits}</span> result(s) <span className="total-time"> - found in {this.props.time} ms</span>
      <Sort currentIndex={this.props.currentIndex} helper={this.props.helper} />
      <ViewModes viewMode={this.props.viewMode} />
    </div>
  }
}

const Toolbar = connect(mapStateToProps)(ToolbarContainer)

export default Toolbar