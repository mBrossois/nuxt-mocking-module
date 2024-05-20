import { setResponseStatus } from 'h3'

export const mockEvent = (event, allMocks) => {
  setResponseStatus(event, 200, 'succes')
  return allMocks
}

export const mockResponsesEvent = (event, activeResponses) => {
  setResponseStatus(event, 200, 'succes')
  return { active_responses: activeResponses }
}
