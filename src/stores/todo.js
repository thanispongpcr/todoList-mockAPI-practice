import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ["Pending", "Doing", "Done"],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
        this.list = response.data;
        console.log("load todo list complete");
      } catch (error) {
        console.log("error", error);
      }
    },

    async loadTodo(id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos/${id}`);
        this.selectedTodo = response.data;
        console.log("load todo by id complete");
      } catch (error) {
        console.log("error", error);
      }
    },

    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: "Pending",
      };
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`, bodyData);
        this.list.push(response.data)
        console.log("Add todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },

    async editTodo(todoData, id) {
      /* 
      {
        name: 'test',
        status: 'Doing
      }
      */
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/todos/${id}`, todoData);
        console.log("Edit todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },

    async removeTodo(id) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
        console.log("Delete todo complete");
      } catch (error) {
        console.log("error", error);
      }
    },
  },
});
