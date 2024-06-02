import type { H3Event, EventHandlerRequest } from 'h3'
import { setResponseStatus } from 'h3'
import type { MockResponses, MocksGroup } from '../types/mock-list'

export const mockEvent = (event: H3Event<EventHandlerRequest>, allMocks: MocksGroup[]) => {
  setResponseStatus(event, 200, 'succes')
  return allMocks
}

export const mockResponsesEvent = (event: H3Event<EventHandlerRequest>, activeResponses: { [key: string]: MockResponses }) => {
  setResponseStatus(event, 200, 'succes')
  return { active_responses: activeResponses }
}
