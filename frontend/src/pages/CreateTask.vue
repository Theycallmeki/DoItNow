<template>
  <div>
    <h2>Create Task</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" placeholder="Task title" required />
      <button type="submit">Add Task</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { createTask } from '../services/taskService';

export default {
  data() {
    return {
      title: '',
      message: ''
    };
  },
  methods: {
    async addTask() {
      try {
        const res = await createTask({ title: this.title, completed: false });
        this.message = `✅ Task created: ${res.data.title}`;
        this.title = ''; // reset form
      } catch (err) {
        this.message = '❌ Failed to create task';
        console.error(err);
      }
    }
  }
};
</script>
