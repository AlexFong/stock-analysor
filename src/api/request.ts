import request from "@/plugin/axios"
// querystring parsing and stringifying library
import qs from "qs"

export function get(url : string, data : any) {
  return request({
    url: `${url}?${qs.stringify(data)}`,
    method: "get"
  })
}

export function post(url : string, data : any, isStringify : boolean = false, isJson : boolean = false, header : object) {

  const headerParams = header ? header : 
    isJson ? { "Content-Type": "application/json" } : null

  const reqParams : any = {
    url,
    method: "post",
    data: isStringify ? qs.stringify(data) : data,
  }
  if(headerParams) { reqParams.headers = headerParams }

  return request(reqParams)
}
