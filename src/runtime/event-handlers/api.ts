import { setResponseStatus } from 'h3'

export const apiEvent = (event, apiUrl, responses) => {
  const activeResponse = responses[`${apiUrl + event.method}_${event.path}`]
  setResponseStatus(event, activeResponse.code, activeResponse.status)
  return activeResponse.data
}
