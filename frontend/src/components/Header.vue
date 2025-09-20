<template>
  <header class="header">
    <div class="container">
      <h1 class="title">My To-Do App</h1>
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
  background-color: #007bff;
  color: #fff;
  padding: 20px 15px;
  width: 100%;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

.title {
  margin: 0;
  font-size: 28px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
</style>
