<template>
  <div>
    <h2>Completed Tasks</h2>
    <ul>
      <li v-for="task in doneTasks" :key="task._id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getTasks } from '../services/taskService';

export default {
  data() {
    return { doneTasks: [] };
  },
  async created() {
    try {
      const res = await getTasks();
      this.doneTasks = res.data.filter(t => t.completed);
    } catch (err) {
      console.error('❌ Error fetching completed tasks', err);
    }
  }
};
</script>
