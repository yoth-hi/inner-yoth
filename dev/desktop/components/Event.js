export function dispatch(target, name, data, options) {
  options || (options = {
    bubbles: !0, cancelable: !1, composed: !0
  });
  data && (options.detail = data);
  const event = new CustomEvent(name, options); 
  target.dispatchEvent(event);
  return event
}