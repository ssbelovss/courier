const c = {}
if(process.env.NODE_ENV === 'production'){
    c.protocol = ''
    c.host = '/api/courier'
    c.port = ''
}
if(process.env.NODE_ENV === 'development'){
    c.protocol = 'http://'
    c.host = '192.168.0.41/api/courier'
    c.port = ''
}

const baseUrl = `${c.protocol}${c.host}${c.port}`

export const apiMachinesUrl = `${baseUrl}`
export const apiMenuUrl = `${baseUrl}`
export const apiUserUrl = `${baseUrl}`
export const apiAuthUrl = `${baseUrl}`
export const apiConfigAppUrl = `infotoria:`