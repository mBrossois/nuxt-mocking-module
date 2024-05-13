import mocks from './index.json'

export const getMocks = () => {
  const resultMocks = []
  for (const mock of mocks.mocks) {
    if (mock) {
      // Split to have groups of the mocked responses
      const mockGroup = { groupName: mock.groupName, mockList: [] }
      for (const mockList of mock.mockList) {
        // Retrieve the json file with the response header values
        import(mockList).then((files) => {
          const apiRequests = { ...files }
          for (const responseFile in apiRequests.responses) {
            // Retrieve the json file with the all the selectable response values
            import(apiRequests.responses[responseFile]).then(responseData =>
              apiRequests.responses[responseFile] = responseData,
            )
          }
          mockGroup.mockList.push(apiRequests)
        })
      }
      resultMocks.push(mockGroup)
    }
  }
  return resultMocks
}
