import axios from './api';

type Read = {
  id?: string;
  query?: Record<string, unknown>;
};

export default class BaseService {
  constructor(private baseURL: string) {}

  public create = async <T>(body: T | T[]) => {
    const res = await axios.post(this.baseURL, body);
    return res.data;
  };

  public read = async ({ id, query }: Read = {}) => {
    const res = await axios.get(this.baseURL + (id ? `/${id}` : ''), { params: query });
    return res.data;
  };

  public update = async <T>(identifier: string | string[], body?: T | T[]) => {
    const res = await axios.put(`${this.baseURL}/${identifier}`, body);
    return res.data;
  };

  public delete = async (identifier: string | string[]) => {
    const res = await axios.delete(`${this.baseURL}/${identifier}`);
    return res.data;
  };
}
