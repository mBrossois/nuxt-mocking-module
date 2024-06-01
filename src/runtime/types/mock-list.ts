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
  status: number
  isDefault: boolean
  delay?: string
  body: object
}

export interface InputI {
  value: string
  type: string
}
