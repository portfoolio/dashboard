import axios from './axios';
import store from 'store/index';

enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface RequestQuery {
  [key: string]: string;
}

interface RequestData {
  query?: RequestQuery;
}

interface Endpoint {
  path: string;
  method: RequestMethod;
}

export interface ServiceInterface {
  request(
    endpoint: Endpoint,
    params?: RequestQuery,
    data?: RequestData | any,
  ): Promise<any>;

  getRoute(endpoint: Endpoint, params: RequestQuery): string;
}

export default class Service {
  static request(
    endpoint: Endpoint,
    params: RequestQuery = {},
    data: any = {},
  ): Promise<object> {
    const state = store.getState();
    if (state.hasOwnProperty('auth') && state.auth.hasOwnProperty('token')) {
      axios.defaults.headers.common.Authorization = state.auth.token;
    }

    return new Promise<object>((resolve, reject) => {
      let route = this.getRoute({ ...endpoint }, params);
      let path = `${route.path}${
        data.hasOwnProperty('query')
          ? this.querify(data.query)
          : ''
      }`;

      return axios
        // @ts-ignore
        .request(path, {
          data,
          method: route.method,
        })
        .then((res: { data: object }) => resolve(res.data))
        .catch((err: { response: any }) => reject(err.response))
      ;
    });
  }

  static getRoute(endpoint: Endpoint, params: RequestQuery) {
    if (params) {
      for (let param in params) {
        if (!endpoint.path.includes(param)) {
          throw new Error(`Route parameter: ${param} is not allowed in route path: ${endpoint.path}`);
        }

        if (params.hasOwnProperty(param)) {
          endpoint.path = endpoint.path.replace(`:${param}`, params[param]);
        }
      }
    }

    return endpoint;
  }

  static querify(params: RequestQuery = {}) {
    let str = [];
    for (let p in params) {
      if (params.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
      }
    }

    return str.join('&');
  }
}
