import { setResponseStatus } from 'h3'

export const apiEvent = (event, apiUrl, responses) => {
  const activeResponse = responses[`${event.method}_${apiUrl + event.path}`]
  setResponseStatus(event, activeResponse.code, activeResponse.status)
  // Needs to be promise to deal with the timeout
  return new Promise(resolve => setTimeout(resolve, activeResponse.delay ?? 0, activeResponse.data))
}
