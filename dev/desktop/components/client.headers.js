import { getCookie } from "./cookie.config.js"
import { getValue } from "./data.config.js"

export default function(header){ 
  header || (header = {}) 
  header["x-inner-visitor-id"] = getValue("VISITOR_DATA")
  return header
}