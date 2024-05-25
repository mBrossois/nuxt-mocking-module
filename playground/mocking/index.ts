import mocks from './index.json'

export const getMocks = () => {
  const resultMocks = []
  for (const mock of mocks.mocks) {
    if (mock) {
      // Split to have groups of the mocked responses
      const mockGroup = { groupName: mock.groupName, requests: [] }
      for (const request of mock.requests) {
        // Retrieve the json file with the response header values
        import(request).then((files) => {
          const apiRequests = { ...files }
          for (const responseFile in apiRequests.responses) {
            // Retrieve the json file with the all the selectable response values
            import(apiRequests.responses[responseFile]).then(responseData =>
              // structuredClone is needed, so the duration update on the mocking route, won't change all durations from the same json file
              apiRequests.responses[responseFile] = structuredClone(responseData),
            )
          }
          mockGroup.requests.push(apiRequests)
        })
      }
      resultMocks.push(mockGroup)
    }
  }
  return resultMocks
}
