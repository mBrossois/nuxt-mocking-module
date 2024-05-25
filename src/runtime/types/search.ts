export interface Search {
  searchTerm: string
  filters: Array<Filters>
}

export interface Filters {
  value: string
  selected: boolean
}
