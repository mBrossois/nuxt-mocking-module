export interface Mocks {
  all_mocks: Array<MocksGroup>
}

export interface MocksGroup {
  groupName: string
  requests: Array<MockRequests>
}

export interface MockRequests {
  name: string
  route: string
  method: string
  responses: Array<MockResponses>
}

export interface MockResponses {
  name: string
  status: string
  code: number
  isDefault: boolean
  delay?: string
  data: object
}

export interface InputI {
  value: string
  type: string
}
