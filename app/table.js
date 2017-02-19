import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

function mapStateToProps({ searchResult, viewMode }) {
  return searchResult === null ?
    { viewMode, hits: [] } :
    { viewMode, hits: searchResult.hits }
}

class TableComponent extends Component {
  render() {
    if(this.props.viewMode === 'table') {
      return  <table className="hits-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>CatCgory</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          { this.props.hits.map(hit => (
            <tr>
              <td dangerouslySetInnerHTML={{ __html: hit._highlightResult.name.value }}></td>
              <td dangerouslySetInnerHTML={{ __html: hit.category }}></td>
              <td>{hit.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    }
  }
}

const Table = connect(mapStateToProps)(TableComponent)

export default Table