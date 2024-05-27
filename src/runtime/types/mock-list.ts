export type Mocks = {
  all_mocks: Array<MocksGroup>
}

export type MocksGroup = {
  groupName: string
  requests: Array<MockRequestDetails>
}

export type MockRequestDetails = {
  name: string
  route: string
  method: string
  responses: Array<MockResponses>
}

export type MockResponses = {
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
