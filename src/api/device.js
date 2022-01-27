import request from '../utils/request';
var htp='http://127.0.0.1:8081/'
export const getDevices = query => {
    return request({
        url: htp+'./device/getDevices',
        method: 'post',
        params: query
    });
};

export const deleteDevice = query => {
    return request({
        url: htp+'./device/deleteDevice',
        method: 'post',
        params: query
    });
};

export const createDevice = query => {
    return request({
        url: htp+'./device/createDevice',
        method: 'post',
        params: query
    });
};

export const getProductDevices = query => {
    return request({
        url: htp+'./device/getProductDevices',
        method: 'post',
        params: query
    });
};

export const checkDevice = query => {
    return request({
        url: htp+'./device/checkDevice',
        method: 'post',
        params: query
    });
};