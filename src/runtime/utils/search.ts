export function search(list: Array<string>, searchTerm: string): Array<string> {
  return list.filter(item => item.toUpperCase().includes(searchTerm.toUpperCase()))
}
