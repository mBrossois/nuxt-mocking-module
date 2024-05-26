import type { MockRequestDetails } from '../types/mock-list'
import type { Search } from '../types/search'

export function search(list: Array<string>, searchTerm: string): Array<string> {
  return list.filter(item => item.toUpperCase().includes(searchTerm.toUpperCase()))
}

export function searchRequests(requests: Array<MockRequestDetails>, search: Search) {
  if (search) {
    return requests.filter(item =>
      (search.filters.includes(item.method) || search.filters.length === 0) && requestAsList(item).findIndex(requestItem => requestItem.toUpperCase().includes(search.searchTerm.toUpperCase())) !== -1,
    )
  }
  return requests
}

function requestAsList(request: MockRequestDetails): Array<string> {
  const responseList = request.responses.map(response => response.name)

  const requestList = [
    request.name,
    request.route,
    ...responseList,
  ]
  return requestList
}
