import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-redux'


const TABLE_HIGHLIGHT_ATTRIBUTES = ['name']

const TABLE_ATTRIBUTES = ['category', 'rank']

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
            { TABLE_HIGHLIGHT_ATTRIBUTES.map(attr => <th>{attr}</th>) }
            { TABLE_ATTRIBUTES.map(attr => <th>{attr}</th>) }
          </tr>
        </thead>
        <tbody>
          { this.props.hits.map(hit => (
            <tr>
              { TABLE_HIGHLIGHT_ATTRIBUTES.map(attr => <td dangerouslySetInnerHTML={{ __html: hit._highlightResult[attr].value }}></td>) }
              { TABLE_ATTRIBUTES.map(attr => <td>{hit[attr]}</td>) }
            </tr>
          ))}
        </tbody>
      </table>
    }
  }
}

const Table = connect(mapStateToProps)(TableComponent)

export default Table