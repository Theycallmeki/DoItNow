<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1 class="title"> DO IT NOW</h1>
        <p class="subtitle">Manage your tasks efficiently and track your progress.</p>
        <div class="cta-buttons">
          <router-link to="/create" class="btn btn-primary">➕ Create Task</router-link>
          <router-link to="/tasks" class="btn btn-secondary">📋 View All Tasks</router-link>
          <router-link to="/done" class="btn btn-accent">✅ Completed Tasks</router-link>
        </div>
      </div>
      <div class="features">
        <div class="feature">🎯<h3>Stay Organized</h3></div>
        <div class="feature">⚡<h3>Quick & Easy</h3></div>
        <div class="feature">📊<h3>Track Progress</h3></div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "HomePage" };
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.hero {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.hero-content {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 40px 24px;
  margin-bottom: 30px;
}

.title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 16px;
  margin-bottom: 24px;
  color: #fff;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.btn {
  padding: 12px 24px;
  border-radius: 25px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary { background-color: #007bff; }
.btn-secondary { background-color: rgba(255,255,255,0.2); color: #000; }
.btn-accent { background-color: #10b981; }

.btn:hover { transform: translateY(-2px); }

.features {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.feature {
  background: rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 16px 12px;
  min-width: 120px;
}

.feature h3 { margin: 8px 0 0; font-size: 14px; color: #fff; }

/* Mobile */
@media(max-width:768px){
  .cta-buttons { flex-direction: column; }
  .btn { width: 100%; max-width: 250px; }
}
</style>
