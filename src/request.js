import crypto from 'node:crypto'
import { request } from 'undici'

function objectToQueryString(obj) {
  const flatObject = flattenObject(obj)
  const sortedKeys = Object.keys(flatObject).sort()
  const queryParams = sortedKeys.map((key) => `${key}=${flatObject[key]}`)
  return queryParams.join('&')
}

function flattenObject(obj, parentKey = '', res = {}) {
  for (const key of Object.keys(obj)) {
    const propName = parentKey ? `${parentKey}_${key}` : key
    if (
      typeof obj[key] === 'object' &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    )
      flattenObject(obj[key], propName, res)
    else res[propName] = obj[key]
  }
  return res
}

function generateApiSign(method, endpoint, data, secretKey) {
  let content = ''
  if (method === 'GET') {
    const query = data && typeof data === 'object' ? Object.entries(data) : []
    query.sort(([a], [b]) => a.localeCompare(b))
    content = query.map(([key, value]) => `${key}=${value}`).join('&')
  } else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    const body = data || {}
    content = objectToQueryString(body)
  }

  const signature = `${method}|${endpoint}|${content}`
  const hmac = crypto.createHmac('sha256', secretKey)
  const apiSign = hmac.update(signature).digest('hex')
  return apiSign
}

export async function kyrrexApiRequest(method, endpoint, data, auth = {}) {
  const url = auth.url || 'https://my.kyrrex.com'

  let requestUrl = `${url}${endpoint}`
  const requestParams = {
    method,
    headers: {
      APIKey: auth.publicKey,
      APISign: generateApiSign(method, endpoint, data, auth.secretKey),
    },
  }
  if (method === 'GET') {
    if (data) {
      requestUrl += `?${objectToQueryString(data)}`
    }
  } else {
    requestParams.headers['Content-Type'] = 'application/json'
    requestParams.body = JSON.stringify(data)
  }

  const response = await request(`${url}${endpoint}`, requestParams)

  if (response.headers['content-type'].indexOf('application/json') > -1) {
    return response.body.json()
  }
  return response.body.text()
}
