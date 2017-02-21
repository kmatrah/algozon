import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

import { SET_TOGGLER } from './actions'

function mapStateToProps({ facetToggler, helper, searchResult}) {
  let counter = 0
  if (searchResult) {
    counter = _.reduce(_.map(helper.getState().disjunctiveFacets, f => {
      return _.filter(searchResult.getFacetValues(f), fv => fv.isRefined).length
    }), (sum, n) => sum + n, 0)
  }
  return { facetToggler, counter }
}

class FacetTogglerComponent extends Component {
  toggle(e) {
    e.preventDefault()
    let visibility = this.props.facetToggler === 'facets-visible' ? 'facets-hidden' : 'facets-visible'
    this.context.store.dispatch({ type: SET_TOGGLER, visibility })
  }

  render() {
    return <a className={`facet-toggler ${this.props.facetToggler}`} onClick={e => this.toggle(e)}>
      <i className="facets-visible fa fa-remove"></i>
      <i className="facets-hidden fa fa-list"></i>
      <div className="counter">{this.props.counter}</div>
    </a>
  }
}

const FacetToggler = connect(mapStateToProps)(FacetTogglerComponent)

export default FacetToggler