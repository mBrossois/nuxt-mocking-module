export interface Search {
  searchTerm: string
  filters: Array<Filters | string>
}

export interface Filters {
  value: string
  selected: boolean
}
