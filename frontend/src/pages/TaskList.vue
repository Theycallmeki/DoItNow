<template>
  <div>
    <h2>All Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <button @click="markDone(task)" :disabled="task.completed">✅ Done</button>
        <button @click="removeTask(task._id)">🗑 Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTasks, updateTask, deleteTask } from '../services/taskService';

export default {
  data() {
    return { tasks: [] };
  },
  async created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const res = await getTasks();
        this.tasks = res.data;
      } catch (err) {
        console.error('❌ Error fetching tasks', err);
      }
    },
    async markDone(task) {
      try {
        await updateTask(task._id, { ...task, completed: true });
        this.fetchTasks();
      } catch (err) {
        console.error('❌ Error updating task', err);
      }
    },
    async removeTask(id) {
      try {
        await deleteTask(id);
        this.fetchTasks();
      } catch (err) {
        console.error('❌ Error deleting task', err);
      }
    }
  }
};
</script>
