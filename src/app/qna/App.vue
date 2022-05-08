<template>
  <div id="app">
    <h1>고객용 화면입니다</h1>
    <nav>
      <router-link to="/qna/view">문의 목록 조회</router-link> |
      <router-link to="/qna/register">문의 등록</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

#tablearea {
  text-align: center;
  margin-top: 30px;
}

#tablearea > table {
  border: 1px solid black;
  border-collapse: collapse;
  display: inline-block;
}

#tablearea > table > tr, td, th {
  border: 1px solid black;
}

</style>
