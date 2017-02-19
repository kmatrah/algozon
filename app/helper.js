import algoliasearch from 'algoliasearch'
import algoliasearchHelper from 'algoliasearch-helper'

const appId = 'GIH37VVGGY';
const apiKey = '04fda7fc532f6a41d8fdf993f3f41836';
const indexName = 'apps';

const client = algoliasearch(appId, apiKey);

export default algoliasearchHelper(client, indexName, {
  disjunctiveFacets: ['category']
})