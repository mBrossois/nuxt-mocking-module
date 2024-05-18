export type Mocks = {
  all_mocks: Array<MocksGroup>
}

export type MocksGroup = {
  groupName: string
  mockList: Array<MockRequestDetails>
}

export type MockRequestDetails = {
  name: string
  route: string
  method: string
  delay?: string
  responses: Array<MockResponses>
}

export type MockResponses = {
  name: string
  status: number
  body: object
}

export interface InputI {
  value: string
  type: string
}
