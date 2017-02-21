import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

import { APP_ID, API_KEY, INDEX_NAME } from './config'

const client = algoliasearch(APP_ID, API_KEY);

export default algoliasearchHelper(client, INDEX_NAME, {
  disjunctiveFacets: ['category']
})
