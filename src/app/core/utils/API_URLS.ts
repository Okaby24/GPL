import { environment } from '../../environments/environment';

export const url = `${environment.urls.dashboard}/rms/api/v1`;
export const streamBaseUrl = `${environment.urls.dashboard}/rms/api/v1/stream/stream/`;
export const imageBaseUrl = `${environment.urls.dashboard}/rms/api/v1/stream/image?path={path}`;

export const API_URLS = {
  Auth: {
    login: url + '/auth/login',
  },
};
