<template>
  <div class="all-tasks">
    <h2 class="title">All Tasks</h2>

    <!-- Loading -->
    <div v-if="loading" class="center">
      <div class="spinner"></div>
      <p>Loading tasks...</p>
    </div>

    <!-- Empty -->
    <div v-else-if="tasks.length === 0" class="center empty">
      <p>No tasks yet!</p>
      <small>Create your first task</small>
    </div>

    <!-- Tasks -->
    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task._id" :class="{ completed: task.completed }">
        <div class="task-content">
          <span>{{ task.completed ? '✓' : '○' }}</span>
          <input v-if="task.editing" v-model="task.newTitle" @keyup.enter="saveTask(task)" />
          <span v-else>{{ task.title }}</span>
        </div>

        <div class="task-actions">
          <button @click="toggleDone(task)">
            {{ task.completed ? '↩️ Undo' : '✅ Done' }}
          </button>
          <button v-if="!task.editing" @click="task.editing = true">✏️ Edit</button>
          <button v-else @click="saveTask(task)">Save</button>
          <button @click="removeTask(task._id)">Delete</button>
        </div>
      </li>
    </ul>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { getTasks, updateTask, deleteTask } from '../services/taskService';

export default {
  data() {
    return { tasks: [], loading: true, error: '' };
  },
  computed: {
    pendingTasks() { return this.tasks.filter(t => !t.completed).length; },
    completedTasks() { return this.tasks.filter(t => t.completed).length; }
  },
  async created() { this.fetchTasks(); },
  methods: {
    async fetchTasks() {
      this.loading = true; this.error = '';
      try {
        this.tasks = (await getTasks()).data.map(t => ({ ...t, editing: false, newTitle: t.title }));
      } catch { this.error = '❌ Error fetching tasks'; }
      finally { this.loading = false; }
    },
    async toggleDone(task) {
      try {
        await updateTask(task._id, { ...task, completed: !task.completed });
        task.completed = !task.completed;
      } catch { this.error = '❌ Error updating task'; }
    },
    async saveTask(task) {
      if (!task.newTitle.trim()) return;
      try {
        await updateTask(task._id, { ...task, title: task.newTitle });
        task.title = task.newTitle;
        task.editing = false;
      } catch { this.error = '❌ Error updating task'; }
    },
    async removeTask(id) {
      if (!confirm('Delete this task?')) return;
      try { this.tasks = this.tasks.filter(t => t._id !== id); await deleteTask(id); }
      catch { this.error = '❌ Error deleting task'; }
    }
  }
};
</script>

<style scoped>
.all-tasks { max-width: 700px; margin: 20px auto; padding: 0 15px; font-family: sans-serif; }
.title { text-align: center; font-size: 24px; margin-bottom: 20px; }
.center { text-align: center; padding: 30px 0; }
.spinner { width: 30px; height: 30px; border: 4px solid #ccc; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 10px; }
@keyframes spin { 0% { transform: rotate(0); } 100% { transform: rotate(360deg); } }
.stats { display: flex; justify-content: space-around; margin-bottom: 20px; font-weight: bold; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-list li { display: flex; justify-content: space-between; padding: 12px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 8px; }
.task-list li.completed { opacity: 0.6; text-decoration: line-through; }
.task-content input { padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; }
.task-actions button { margin-left: 5px; padding: 6px 10px; border: none; border-radius: 6px; cursor: pointer; }
.task-actions button:disabled { opacity: 0.5; cursor: not-allowed; }
.error { color: red; text-align: center; margin-top: 20px; }
.empty small { display: block; margin-top: 5px; color: #555; }
</style>
