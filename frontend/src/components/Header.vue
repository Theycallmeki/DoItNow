<template>
  <header class="header">
    <div class="container">
      <h1 class="title">
        <span class="title-icon">✨</span>
        DO IT NOW!
      </h1>
      <nav class="nav">
        <router-link to="/tasks" class="link">
          <span class="link-icon">📋</span>
          All Tasks
        </router-link>
        <router-link to="/create" class="link">
          <span class="link-icon">➕</span>
          Create Task
        </router-link>
        <router-link to="/done" class="link">
          <span class="link-icon">✅</span>
          Completed
        </router-link>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 12px 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 30px 30px;
  background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
  opacity: 0.1;
  animation: shimmer 20s linear infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(100px); }
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.title {
  margin: 0;
  font-size: clamp(20px, 3.5vw, 28px);
  font-weight: 700;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  from { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
  to { filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6)); }
}

.title-icon {
  font-size: 1.2em;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.link:hover::before {
  left: 100%;
}

.link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.link:active {
  transform: translateY(0);
}

.link-icon {
  font-size: 1.1em;
  transition: transform 0.3s ease;
}

.link:hover .link-icon {
  transform: scale(1.2) rotate(10deg);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.router-link-active .link-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .header {
    padding: 10px 16px;
  }
  
  .container {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .nav {
    justify-content: center;
    gap: 10px;
  }
  
  .link {
    padding: 6px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .nav {
    flex-direction: column;
    width: 100%;
  }
  
  .link {
    width: 100%;
    justify-content: center;
    max-width: 200px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  }
  
  .title {
    background: linear-gradient(45deg, #fff, #e0e7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .header::before,
  .title,
  .title-icon,
  .link-icon,
  .router-link-active .link-icon {
    animation: none;
  }
  
  .link {
    transition: none;
  }
}</style>