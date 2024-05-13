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
  succes: boolean
}
