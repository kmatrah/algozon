import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

function mapStateToProps({ facetToggler, searchResult, viewMode }) {
  return searchResult === null ?
    { facetToggler, viewMode, hits: [] } :
    { facetToggler, viewMode, hits: searchResult.hits }
}

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = { loadingError: false }
  }

  handleError() {
    this.setState({ loadingError: true })
  }

  render() {
    return <a href={this.props.hit.link} target="_blank">
      { this.state.loadingError ?
        <div className="image-error"><i className="fa fa-chain-broken"></i></div> :
        <img onError={e => this.handleError()} src={this.props.hit.image} />
      }
    </a>
  }
}

class GridContainer extends Component {
  render() {
    if(this.props.viewMode === 'grid') {
      return  <div className={`hits-grid ${this.props.facetToggler}`}>
        { this.props.hits.map(hit => (
          <Cell hit={hit} />
        ))}
        <div className="clearfix"></div>
      </div>
    }
  }
}

const Grid = connect(mapStateToProps)(GridContainer)

export default Grid