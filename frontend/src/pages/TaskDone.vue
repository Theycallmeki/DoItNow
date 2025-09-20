<template>
  <div class="completed-tasks">
    <div class="card">
      <h2 class="title"><span class="title-icon">✅</span> Completed Tasks</h2>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading completed tasks...</p>
      </div>

      <div v-else-if="doneTasks.length === 0" class="empty-state">
        <div class="empty-icon">🎯</div>
        <p>No completed tasks yet!</p>
        <small>Complete some tasks to see them here</small>
      </div>

      <div v-else>
        <div class="stats">
          <span class="count">{{ doneTasks.length }}</span>
          <span class="label">{{ doneTasks.length === 1 ? 'task' : 'tasks' }} completed</span>
        </div>
        <ul class="task-list">
          <li v-for="task in doneTasks" :key="task._id" class="task-item">
            <span class="task-check">✓</span>
            <span class="task-title">{{ task.title }}</span>
          </li>
        </ul>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { getTasks } from '../services/taskService';

export default {
  data: () => ({ doneTasks: [], loading: true, error: '' }),
  async created() {
    try {
      this.doneTasks = (await getTasks()).data.filter(t => t.completed);
    } catch {
      this.error = '❌ Error fetching completed tasks';
    } finally { this.loading = false; }
  }
};
</script>

<style scoped>
.completed-tasks { padding:20px; max-width:600px; margin:0 auto; }
.card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius:20px; padding:24px; border:1px solid rgba(255,255,255,0.2); box-shadow:0 8px 32px rgba(102,126,234,0.2); }
.title { margin:0 0 24px; font-size:24px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; text-align:center; }
.title-icon { font-size:1.2em; animation:pulse 2s infinite; }
@keyframes pulse {0%{transform:scale(1);}50%{transform:scale(1.1);}100%{transform:scale(1);}}
.loading { text-align:center; padding:40px 20px; color:#667eea; }
.spinner { width:40px; height:40px; border:4px solid rgba(102,126,234,0.3); border-top:4px solid #667eea; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto 16px;}
@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
.empty-state { text-align:center; padding:40px 20px; color:#888; }
.empty-icon { font-size:3em; margin-bottom:16px; opacity:0.6; }
.empty-state p { margin:0 0 8px 0; font-size:18px; font-weight:500; }
.empty-state small { font-size:14px; opacity:0.7; }
.stats { background: linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; padding:16px 20px; border-radius:16px; margin-bottom:20px; text-align:center; position:relative; overflow:hidden; }
.stats::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent); animation:shimmer 3s linear infinite; }
@keyframes shimmer {0%{left:-100%;}100%{left:100%;}}
.count { font-size:2em; font-weight:800; display:block; margin-bottom:4px; }
.label { font-size:14px; opacity:0.9; text-transform:uppercase; letter-spacing:0.5px; }
.task-list { list-style:none; padding:0; margin:0; }
.task-item { background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px; margin-bottom:8px; display:flex; align-items:center; gap:12px; transition:all 0.3s ease; position:relative; overflow:hidden; }
.task-item:hover { background:rgba(255,255,255,0.1); transform:translateX(4px); border-color:rgba(102,126,234,0.3);}
.task-check { width:24px; height:24px; background:linear-gradient(135deg,#34d399,#10b981); color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:bold; flex-shrink:0; animation:checkBounce 0.5s ease-out; }
@keyframes checkBounce {0%{transform:scale(0);}50%{transform:scale(1.2);}100%{transform:scale(1);}}
.task-title { flex:1; font-size:16px; font-weight:500; color:#333; text-decoration:line-through; text-decoration-color:rgba(102,126,234,0.6); text-decoration-thickness:2px; opacity:0.8; }
.error-message { background:rgba(239,68,68,0.1); color:#dc2626; border:1px solid rgba(239,68,68,0.3); padding:12px 16px; border-radius:12px; margin-top:16px; text-align:center; font-weight:500; }

/* Mobile */
@media (max-width:768px){.completed-tasks{padding:16px;}.card{padding:20px;}.title{font-size:20px;}.task-item{padding:12px;}.task-title{font-size:15px;}}
/* Dark */
@media (prefers-color-scheme: dark){.card{background:rgba(0,0,0,0.3);border-color:rgba(255,255,255,0.1);}.task-title{color:#e5e5e5;}.empty-state{color:#ccc;}.loading{color:#a5b4fc;}}
/* Reduced motion */
@media (prefers-reduced-motion: reduce){.title-icon,.spinner,.stats::before,.task-check{animation:none;}.task-item,.tasks-container{transition:none;}}
</style>
