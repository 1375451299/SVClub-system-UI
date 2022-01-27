import request from '../utils/request';
var htp='http://127.0.0.1:8081/'
export const fetchData = query => {
    return request({
        url: htp+'./product/getProduct',
        method: 'get',
        params: query
    });
};

export const deleteProduct = query => {
    return request({
        url: htp+'./product/deleteProduct',
        method: 'post',
        params: query
    });
};

export const createProduct = query => {
    return request({
        url: htp+'./product/createProduct',
        method: 'post',
        params: query
    });
};

export const checkProduct = query => {
    return request({
        url: htp+'./product/checkProduct',
        method: 'post',
        params: query
    });
};
export const getAllProduct = query => {
    return request({
        url: htp+'./product/getAllProduct',
        method: 'get',
        params: query
    });
};

