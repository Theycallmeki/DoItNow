<template>
  <div class="all-tasks">
    <div class="card">
      <h2 class="title">
        <span class="title-icon">📋</span>
        All Tasks
      </h2>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading tasks...</p>
      </div>
      
      <div v-else-if="tasks.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <p>No tasks yet!</p>
        <small>Create your first task to get started</small>
      </div>
      
      <div v-else class="tasks-container">
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ pendingTasks }}</span>
            <span class="stat-label">Pending</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ completedTasks }}</span>
            <span class="stat-label">Done</span>
          </div>
        </div>
        
        <ul class="task-list">
          <li v-for="task in tasks" :key="task._id" :class="['task-item', { completed: task.completed }]">
            <div class="task-content">
              <span class="task-status" :class="{ active: task.completed }">
                {{ task.completed ? '✓' : '○' }}
              </span>
              <span class="task-title" :class="{ completed: task.completed }">
                {{ task.title }}
              </span>
            </div>
            
            <div class="task-actions">
              <button 
                @click="markDone(task)" 
                :disabled="task.completed"
                class="btn btn-complete"
                v-if="!task.completed"
              >
                <span class="btn-icon">✅</span>
                Done
              </button>
              
              <button 
                @click="removeTask(task._id)"
                class="btn btn-delete"
              >
                <span class="btn-icon">🗑</span>
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
      
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { getTasks, updateTask, deleteTask } from '../services/taskService';

export default {
  data() {
    return { 
      tasks: [],
      loading: true,
      error: ''
    };
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter(t => !t.completed).length;
    },
    completedTasks() {
      return this.tasks.filter(t => t.completed).length;
    }
  },
  async created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        this.loading = true;
        this.error = '';
        const res = await getTasks();
        this.tasks = res.data;
      } catch (err) {
        this.error = '❌ Error fetching tasks';
        console.error('Error fetching tasks', err);
      } finally {
        this.loading = false;
      }
    },
    async markDone(task) {
      try {
        await updateTask(task._id, { ...task, completed: true });
        // Update locally for instant feedback
        const taskIndex = this.tasks.findIndex(t => t._id === task._id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = true;
        }
      } catch (err) {
        this.error = '❌ Error updating task';
        console.error('Error updating task', err);
      }
    },
    async removeTask(id) {
      if (!confirm('Are you sure you want to delete this task?')) return;
      
      try {
        await deleteTask(id);
        // Remove locally for instant feedback
        this.tasks = this.tasks.filter(t => t._id !== id);
      } catch (err) {
        this.error = '❌ Error deleting task';
        console.error('Error deleting task', err);
      }
    }
  }
};
</script>

<style scoped>
.all-tasks {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
}

.title {
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  justify-content: center;
}

.title-icon {
  font-size: 1.2em;
  animation: flip 3s ease-in-out infinite;
}

@keyframes flip {
  0%, 100% { transform: rotateY(0); }
  50% { transform: rotateY(180deg); }
}

.loading {
  text-align: center;
  padding: 40px 20px;
  color: #667eea;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(102, 126, 234, 0.3);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #888;
}

.empty-icon {
  font-size: 3em;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state p {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.empty-state small {
  font-size: 14px;
  opacity: 0.7;
}

.tasks-container {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.stats {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.stats::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2em;
  font-weight: 800;
  display: block;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.task-item.completed {
  opacity: 0.7;
  background: rgba(34, 197, 94, 0.05);
  border-color: rgba(34, 197, 94, 0.2);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.task-status {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.task-status.active {
  background: linear-gradient(135deg, #34d399, #10b981);
  border-color: #10b981;
  color: white;
  animation: checkBounce 0.5s ease-out;
}

@keyframes checkBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.task-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;
}

.task-title.completed {
  text-decoration: line-through;
  text-decoration-color: rgba(102, 126, 234, 0.6);
  text-decoration-thickness: 2px;
  opacity: 0.7;
}

.task-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.btn-complete {
  background: linear-gradient(135deg, #34d399, #10b981);
  color: white;
}

.btn-complete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
}

.btn-complete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-delete {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
}

.btn-icon {
  font-size: 1em;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 12px 16px;
  border-radius: 12px;
  margin: 16px 0 0 0;
  text-align: center;
  font-weight: 500;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .all-tasks {
    padding: 16px;
  }
  
  .card {
    padding: 20px;
  }
  
  .title {
    font-size: 20px;
  }
  
  .stats {
    padding: 16px;
    gap: 16px;
  }
  
  .task-item {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .task-content {
    justify-content: flex-start;
  }
  
  .task-actions {
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    justify-content: center;
    padding: 10px 16px;
    font-size: 14px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .card {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .task-title {
    color: #e5e5e5;
  }
  
  .task-status {
    border-color: #666;
  }
  
  .empty-state {
    color: #ccc;
  }
  
  .loading {
    color: #a5b4fc;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .title-icon,
  .spinner,
  .stats::before,
  .task-status.active {
    animation: none;
  }
  
  .task-item,
  .btn,
  .tasks-container {
    transition: none;
  }
}</style>