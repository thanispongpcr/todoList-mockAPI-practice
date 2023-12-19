<script setup>
import { useTodoStore } from "../stores/todo";
import { useRoute, RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import Loading from "../components/Loading.vue";

const todoStore = useTodoStore();
const todoId = ref(-1);
const isLoaded = ref(false);
const isUpdated = ref(false)
const route = useRoute();

onMounted(async () => {
  await todoStore.loadTodo(route.params.id);
  isLoaded.value = true;
  todoId.value = parseInt(route.params.id);
});

const editTodo = async (selectedTodo) => {
  try {
    isLoaded.value = false;
    const bodyData = {
      name: selectedTodo.name,
      status: selectedTodo.status,
    };
    await todoStore.editTodo(bodyData, todoId.value);
    isUpdated.value = true;
    isLoaded.value = true;
    setTimeout(()=>{
      isUpdated.value = false;
    },4000)

  } catch (error) {
    console.log("error: ", error);
  }
};
</script>
<template>
  <div class="w-1/2 mx-auto">
    <div class="toast toast-top toast-start">
      <div v-if="isUpdated" class="alert alert-success">
        <span>Update successfully.</span>
      </div>
    </div>
    <div class="flex items-center">
      <RouterLink class="btn mr-3" :to="{ name: 'todo-list' }"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </RouterLink>
      <div>Edit</div>
    </div>

    <div v-if="isLoaded">
      ID
      <div class="badge badge-neutral">{{ todoId }}</div>
      <div>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Name todo"
            class="input input-bordered w-full"
            v-model="todoStore.selectedTodo.name"
          />
        </label>
      </div>

      <div>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select
            class="select select-bordered"
            v-model="todoStore.selectedTodo.status"
          >
            <!-- <option value="">Select status</option> -->
            <option v-for="status in todoStore.statuses" :value="status">
              {{ status }}
            </option>
          </select>
        </label>
      </div>

      <div class="flex">
        <button
          class="btn btn-circle mt-5 w-full"
          @click="editTodo(todoStore.selectedTodo)"
        >
          Edit
        </button>
      </div>
    </div>

    <div v-else>
      <Loading />
    </div>
  </div>
</template>
