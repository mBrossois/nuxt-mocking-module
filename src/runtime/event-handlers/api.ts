import { setResponseStatus } from 'h3'

export const apiEvent = (event, responses) => {
  const activeResponse = responses[`${event.method}_${event.path}`]
  setResponseStatus(event, activeResponse.code, activeResponse.status)
  return activeResponse.data
}
