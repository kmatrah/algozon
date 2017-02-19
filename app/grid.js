import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

function mapStateToProps({ searchResult, viewMode }) {
  return searchResult === null ?
    { viewMode, hits: [] } :
    { viewMode, hits: searchResult.hits }
}

class GridComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  handleError(hit, e) {
    this.setState({ errors: _.merge({}, this.state.errors, { [hit.objectID]: true }) })
  }

  render() {
    if(this.props.viewMode === 'grid') {
      return  <div className="hits-grid">
        { this.props.hits.map(hit => (
          <a href={hit.link} target="_blank">
            { this.state.errors[hit.objectID] ?
              <div className="image-error"><i className="fa fa-remove"></i></div> :
              <img onError={e => this.handleError(hit, e)} src={hit.image} />
            }
          </a>
        ))}
        <div className="clearfix"></div>
      </div>
    }
  }
}

const Grid = connect(mapStateToProps)(GridComponent)

export default Grid