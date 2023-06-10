import { baseApi } from "@/plugins/axios";

const api = "/api";

const list = () => baseApi.get(`${api}/todo`);
const del = (id) => baseApi.delete(`${api}/todo/${id}`);
const add = (body) => baseApi.post(`${api}/todo`, body);
const update = (id, body) => baseApi.put(`${api}/todo/${id}`, body);

export { list, del, add, update };
