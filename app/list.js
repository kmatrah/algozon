import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import _ from 'lodash'

function mapStateToProps({ searchResult, viewMode }) {
  return searchResult === null ?
    { viewMode, hits: [] } :
    { viewMode, hits: searchResult.hits }
}

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = { loadingError: false }
  }

  handleError() {
    this.setState({ loadingError: true })
  }

  render() {
    return <li>
      <a href={this.props.hit.link} target="_blank">
        <div className="hit-thumb">
          { this.state.loadingError ?
            <div className="image-error"><i className="fa fa-chain-broken"></i></div> :
            <img onError={e => this.handleError()} src={this.props.hit.image} />
          }
        </div>
        <div className="hit-name" dangerouslySetInnerHTML={{ __html: this.props.hit._highlightResult.name.value }}></div>
        <div className="hit-category" dangerouslySetInnerHTML={{ __html: this.props.hit.category }}></div>
      </a>
    </li>
  }
}

class ListContainer extends Component {
  render() {
    if(this.props.viewMode === 'list') {
      return <ul className="hits-list">
        { this.props.hits.map(hit => (
          <ListItem hit={hit} />
        ))}
      </ul>
    }
  }
}

const List = connect(mapStateToProps)(ListContainer)

export default List