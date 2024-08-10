
let ws = null;
export const useWebsocket = (options) => {
  if (ws) return ws;
  ws = new WebSocket(`ws://127.0.0.1:8080/channel/echo${Math.random()}`);
  ws.onopen = options.onopen;
  ws.onmessage = options.onmessage
  ws.onclose = options.onclose

  return ws;
}
