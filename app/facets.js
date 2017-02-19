import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import _ from 'lodash'

import { UPDATE_SEARCH } from './actions'

function mapStateToProps({ helper, searchResult }) {
  let facets = helper.getState().disjunctiveFacets

  return searchResult === null ?
    { helper, facets, facetValues: _.fromPairs(_.map(facets, f => [f, []])) } :
    { helper, facets, facetValues: _.fromPairs(_.map(facets, f => [f, searchResult.getFacetValues(f)])) }
}

class FacetsComponent extends Component {
  toggleFacetValue(attribute, value, e) {
    e.preventDefault()
    let helper = this.props.helper.toggleRefine(attribute, value)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  clearFacet(attribute, e) {
    e.preventDefault()
    let helper = this.props.helper.clearRefinements(attribute)
    this.context.store.dispatch({ type: UPDATE_SEARCH, helper: helper })
    helper.search()
  }

  render() {
    return <ul className="facets">
      { this.props.facets.map(facet => (
        <li>
          <div className="facet-name">
            Filter by { facet }
            { this.props.helper.hasRefinements(facet) ?
              <a href onClick={e => this.clearFacet(facet, e)}><i className="fa fa-remove"></i></a> :
              ''
            }
          </div>
          <ul>
            { this.props.facetValues[facet].map(facetValue => (
              <li className={facetValue.isRefined ? 'facet active' : 'facet'}>
                <a href onClick={e => this.toggleFacetValue(facet, facetValue.name, e) }>
                  <span className="facet-check">
                    <input type="checkbox" checked={facetValue.isRefined} />
                    <label></label>
                  </span>
                  <span className="facet-value">{facetValue.name}</span>
                  <span className="facet-count">{facetValue.count}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  }
}

const Facets = connect(mapStateToProps)(FacetsComponent)

export default Facets