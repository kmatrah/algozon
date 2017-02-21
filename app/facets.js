import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import _ from 'lodash'

import { UPDATE_SEARCH } from './actions'

function mapStateToProps({ facetToggler, helper, searchResult }) {
  let facets = helper.getState().disjunctiveFacets

  return searchResult === null ?
    { facetToggler, helper, facets, facetValues: _.fromPairs(_.map(facets, f => [f, []])) } :
    { facetToggler, helper, facets, facetValues: _.fromPairs(_.map(facets, f => [f, searchResult.getFacetValues(f)])) }
}

class FacetValue extends Component {
  toggleFacetValue(facetName, value, e) {
    e.preventDefault()
    let helper = this.props.helper.toggleRefine(facetName, value)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  render() {
    return <li className={this.props.facetValue.isRefined ? 'facet active' : 'facet'}>
      <a href onClick={e => this.toggleFacetValue(this.props.facetName, this.props.facetValue.name, e) }>
        <span className="facet-check">
          <input type="checkbox" checked={this.props.facetValue.isRefined} />
          <label></label>
        </span>
        <span className="facet-value">{this.props.facetValue.name}</span>
        <span className="facet-count">{this.props.facetValue.count}</span>
      </a>
    </li>
  }
}

class Facet extends Component {
  clearFacet(name, e) {
    e.preventDefault()
    let helper = this.props.helper.clearRefinements(name)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  render() {
    return <li>
      <div className="facet-name">
        Filter by { this.props.name }
        { this.props.helper.hasRefinements(this.props.name) ?
          <a href onClick={e => this.clearFacet(this.props.name, e)}><i className="fa fa-remove"></i></a> :
          ''
        }
      </div>
      <ul>
        { this.props.facetValues.map(facetValue => (
          <FacetValue facetName={this.props.name} facetValue={facetValue} helper={this.props.helper} />
        ))}
      </ul>
    </li>
  }
}

class FacetsContainer extends Component {
  render() {
    return <ul className={`facets ${this.props.facetToggler}`}>
      { this.props.facets.map(facet => (
        <Facet
          name={facet}
          facetValues={this.props.facetValues[facet]}
          helper={this.props.helper} />
      ))}
    </ul>
  }
}

const Facets = connect(mapStateToProps)(FacetsContainer)

export default Facets