import type { H3Event, EventHandlerRequest } from 'h3'
import { setResponseStatus } from 'h3'
import type { MockResponses } from '../types/mock-list'

export const apiEvent = (event: H3Event<EventHandlerRequest>, apiUrl: string, responses: { [key: string]: MockResponses }) => {
  const responseKeys = Object.keys(responses)
  const url = `${event.method}_${apiUrl + event.path}`
  const activeKey = responseKeys.find(key => new RegExp(`\\b(${key})\\`, 'g').test(url))
  if (!activeKey) {
    return
  }
  const activeResponse = responses[activeKey]

  const response = activeResponse.data || activeResponse.message
  setResponseStatus(event, activeResponse.code, activeResponse.status)
  // Needs to be promise to deal with the timeout
  return new Promise(resolve => setTimeout(() => {
    resolve(response)
  }, Number(activeResponse.delay)))
}
