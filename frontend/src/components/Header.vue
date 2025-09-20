<template>
  <header :style="headerStyle">
    <h1 :style="titleStyle">My To-Do App</h1>
    <nav :style="navStyle">
      <router-link to="/tasks" :style="linkStyle">All Tasks</router-link>
      <router-link to="/create" :style="linkStyle">Create Task</router-link>
      <router-link to="/done" :style="linkStyle">Completed</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    return {
      headerStyle: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      titleStyle: {
        margin: 0,
        fontSize: '20px'
      },
      navStyle: {
        display: 'flex',
        gap: '15px'
      },
      linkStyle: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold'
      }
    }
  }
}
</script>
