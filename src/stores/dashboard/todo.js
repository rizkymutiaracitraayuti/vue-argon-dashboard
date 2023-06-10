import { defineStore } from "pinia";

import * as s$todo from "@/services/dashboard/todo";

const d$todo = defineStore({
  id: "todo",
  state: () => ({
    list: [],
  }),
  actions: {
    async a$list() {
      try {
        const { data } = await s$todo.list();
        this.list = data;
      } catch (e) {
        console.error("actions todo list error", e);
        throw e;
      }
    },
    async a$add(body) {
      try {
        await s$todo.add(body);
      } catch (e) {
        console.error("actions add todo error", e);
        throw e;
      }
    },
    async a$edit(id, body) {
      try {
        await s$todo.update(id, body);
      } catch (e) {
        console.error("actions edit todo error", e);

        throw e;
      }
    },
    async a$del(id) {
      try {
        await s$todo.del(id);
        await this.a$list();
      } catch (e) {
        console.error("actions edit todo error", e);
        throw e;
      }
    },
  },
  getters: {
    g$list: ({ list }) => list,
    g$detail: ({ list }) => list,
  },
});

export default d$todo;
