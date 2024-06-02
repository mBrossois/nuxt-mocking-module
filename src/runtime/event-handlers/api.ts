import type { H3Event, EventHandlerRequest } from 'h3'
import { setResponseStatus } from 'h3'
import type { MockResponses } from '../types/mock-list'

export const apiEvent = (event: H3Event<EventHandlerRequest>, apiUrl: string, responses: { [key: string]: MockResponses }) => {
  const activeResponse = responses[`${event.method}_${apiUrl + event.path}`]
  setResponseStatus(event, activeResponse.code, activeResponse.status)
  // Needs to be promise to deal with the timeout
  return new Promise(resolve => setTimeout(resolve, Number(activeResponse.delay), activeResponse.data))
}
