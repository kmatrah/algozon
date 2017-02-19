import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import _ from 'lodash'

function mapStateToProps({ searchResult, viewMode }) {
  return searchResult === null ?
    { viewMode, hits: [] } :
    { viewMode, hits: searchResult.hits }
}

class ListComponent extends Component {
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
    if(this.props.viewMode === 'list') {
      return  <ul className="hits-list">
        { this.props.hits.map(hit => (
          <li>
            <a href={hit.link} target="_blank">
              <div className="hit-thumb">
                { this.state.errors[hit.objectID] ?
                  <div className="image-error"><i className="fa fa-remove"></i></div> :
                  <img onError={e => this.handleError(hit, e)} src={hit.image} />
                }
              </div>
              <div className="hit-name" dangerouslySetInnerHTML={{ __html: hit._highlightResult.name.value }}></div>
              <div className="hit-category">{hit.category}</div>
            </a>
          </li>
        ))}
      </ul>
    }
  }
}

const List = connect(mapStateToProps)(ListComponent)

export default List