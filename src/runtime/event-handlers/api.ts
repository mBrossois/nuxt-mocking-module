import { setResponseStatus } from 'h3'

export const apiEvent = (event) => {
  console.log('event', event.path)
  console.log('event', event.method)
  setResponseStatus(event, 200, 'succes')
  return { data: 'Not Found' }
}
