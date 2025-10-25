<template>
  <header class="header">
    <div class="container">
      <h1 class="title">
        <span class="title-icon">✨</span>
        DO IT NOW.
      </h1>
      <nav class="nav">
        <router-link to="/tasks" class="link">All Tasks</router-link>
        <router-link to="/create" class="link">Create Task</router-link>
        <router-link to="/done" class="link">Completed</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  background-color: #007bff; /* solid color */
  color: #fff;
  padding: 12px 20px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  margin: 0;
  margin-left: 10px; /* slightly to the left */
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 1.2em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,20%,50%,80%,100%{transform:translateY(0);}
  40%{transform:translateY(-6px);}
  60%{transform:translateY(-3px);}
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 25px;
  background-color: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.link:hover {
  background-color: rgba(255,255,255,0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Mobile */
@media(max-width:768px){
  .container{flex-direction:column; text-align:center; gap:10px;}
  .nav{justify-content:center; gap:10px;}
  .link{padding:6px 12px; font-size:13px;}
}

@media(max-width:480px){
  .nav{flex-direction:column; width:100%;}
  .link{width:100%; max-width:200px; justify-content:center;}
}
</style>
