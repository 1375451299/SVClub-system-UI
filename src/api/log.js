import request from '../utils/request';
var htp='http://127.0.0.1:8081/'
export const fetchData = query => {
    return request({
        url: htp+'./log/getAlllog',
        method: 'get',
        params: query
    });
};