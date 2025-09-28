<template>
  <div class="create-task">
    <div class="card">
      <h2 class="title"><span class="title-icon">➕</span> Create Task</h2>
      <form @submit.prevent="addTask" class="form">
        <div class="input-group">
          <input v-model="title" placeholder="What needs to be done?!" required class="input"/>
          <button type="submit" class="btn" :disabled="!title.trim()">
            <span class="btn-icon">✨</span> Add Task
          </button>
        </div>
      </form>
      <transition name="message">
        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { createTask } from '../services/taskService';

export default {
  data: () => ({ title: '', message: '', messageType: 'success' }),
  methods: {
    async addTask() {
      if (!this.title.trim()) return;
      try {
        const res = await createTask({ title: this.title, completed: false });
        this.message = `✅ Task created: ${res.data.title}`;
        this.messageType = 'success';
        this.title = '';
        setTimeout(() => this.message = '', 3000);
      } catch {
        this.message = '❌ Failed to create task';
        this.messageType = 'error';
        setTimeout(() => this.message = '', 5000);
      }
    }
  }
};
</script>

<style scoped>
.create-task { padding:20px; max-width:500px; margin:0 auto; }
.card { background: rgba(255,255,255,0.1); backdrop-filter:blur(20px); border-radius:20px; padding:24px; border:1px solid rgba(255,255,255,0.2); box-shadow:0 8px 32px rgba(102,126,234,0.2); }
.title { margin:0 0 20px; font-size:24px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; text-align:center; background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color:transparent;}
.title-icon { font-size:1.2em; animation:rotate 3s linear infinite; }
@keyframes rotate {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
.form { margin-bottom:16px; }
.input-group { display:flex; gap:12px; flex-wrap:wrap; }
.input { flex:1; min-width:200px; padding:12px 16px; border:2px solid rgba(102,126,234,0.3); border-radius:50px; background:rgba(255,255,255,0.9); font-size:16px; transition:all 0.3s ease; outline:none; }
.input:focus { border-color:#667eea; background:rgba(255,255,255,1); transform:translateY(-2px); box-shadow:0 8px 25px rgba(102,126,234,0.3);}
.input::placeholder { color:#999; font-style:italic; }
.btn { padding:12px 20px; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:white; border:none; border-radius:50px; font-weight:600; font-size:16px; cursor:pointer; display:flex; align-items:center; gap:8px; position:relative; overflow:hidden; }
.btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent); transition:left 0.5s; }
.btn:hover::before { left:100%; }
.btn:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(102,126,234,0.4);}
.btn:active { transform:translateY(-1px);}
.btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; box-shadow:none; }
.btn-icon { font-size:1.1em; transition: transform 0.3s ease; }
.btn:hover .btn-icon { transform:scale(1.2) rotate(180deg); }
.message { margin:16px 0 0; padding:12px 16px; border-radius:12px; font-weight:500; text-align:center; transition:all 0.3s ease; }
.message.success { background:rgba(34,197,94,0.1); color:#16a34a; border:1px solid rgba(34,197,94,0.3);}
.message.error { background:rgba(239,68,68,0.1); color:#dc2626; border:1px solid rgba(239,68,68,0.3);}
.message-enter-active,.message-leave-active{transition:all 0.3s ease;}
.message-enter-from,.message-leave-to{opacity:0; transform:translateY(-10px);}
@media(max-width:768px){.create-task{padding:16px;}.card{padding:20px;}.input-group{flex-direction:column;}.input{min-width:unset;}.btn{justify-content:center;}}
@media(prefers-color-scheme:dark){.card{background:rgba(0,0,0,0.3);border-color:rgba(255,255,255,0.1);}.input{background:rgba(255,255,255,0.1);color:white;border-color:rgba(255,255,255,0.2);}.input:focus{background:rgba(255,255,255,0.2);}.input::placeholder{color:#ccc;}}
@media(prefers-reduced-motion:reduce){.title-icon,.btn-icon{animation:none;}.input,.btn,.message{transition:none;}}
</style>
