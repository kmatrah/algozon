import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

function mapStateToProps({ searchResult, viewMode }) {
  return searchResult === null ?
    { viewMode, hits: [] } :
    { viewMode, hits: searchResult.hits }
}

class TableRow extends Component {
  render() {
    return <tr>
      <td dangerouslySetInnerHTML={{ __html: this.props.hit._highlightResult.name.value }}></td>
      <td dangerouslySetInnerHTML={{ __html: this.props.hit.category }}></td>
      <td>{this.props.hit.rank}</td>
      <td><a href={this.props.hit.link} target="_blank"><i className="fa fa-share"></i></a></td>
    </tr>
  }
}

class TableContainer extends Component {
  render() {
    if(this.props.viewMode === 'table') {
      return  <table className="hits-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>CatCgory</th>
            <th>Rank</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { this.props.hits.map(hit => (
            <TableRow hit={hit} />
          ))}
        </tbody>
      </table>
    }
  }
}

const Table = connect(mapStateToProps)(TableContainer)

export default Table