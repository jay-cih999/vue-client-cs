<template>
  <div id="app">
    <h1>상담사 화면입니다</h1>
    <div v-if="$store.state.isLogin">
      <span>{{$store.state.user.name}} 님 환영합니다. </span>
      <button @click="logout">로그아웃</button>
    </div>
    <nav>
      <!-- <router-link to="/admin/view">문의 목록 조회</router-link> -->
      <a href="" v-if="$store.state.isLogin" @click.stop="goView">문의 목록 조회</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {   
    methods: {
      logout() {
        this.$store.commit('logout');
      },
      goView() {
        this.$router.push("/admin/view");
      }
    }
  }
</script>

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
