import { setResponseStatus } from 'h3'

export const mockEvent = (event, allMocks) => {
  console.log('event', event.path)
  console.log('event', event.method)
  setResponseStatus(event, 200, 'succes')
  return { data: { all_mocks: allMocks } }
}
