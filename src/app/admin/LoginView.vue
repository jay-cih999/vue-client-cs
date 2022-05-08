<template>
  <div>
    ID <input type="text" v-model="userId" />
    Password <input type="password" v-model="authKey" />
    <br>
    <button @click="doLogin">Login</button>
  </div>
</template>

<script>
export default {
   computed: {
    userInfo() {
      return this.$store.getters.user;
    }
  },
  data() {
      return {
          userId: '',
          authKey: ''
      }
  },
  methods : {
    async doLogin() {      
      this.$store.dispatch('doLogin', {id : this.userId, authKey: this.authKey}).then(r => {           
        alert(`${r.name} 님 로그인 되었습니다.`);
        this.$router.push('/admin/view');
      }).catch(error => {        
        if(error.response.data.errors && error.response.data.errors.length > 0) {
          let msg = '';
          error.response.data.errors.forEach(err => {
            msg += err.defaultMessage + "\n";
          });
          alert(msg);
        } else if(error.response.data.code && error.response.data.code !== '') {
          alert(error.response.data.msg);
        }
      });
    }
  }
}
</script>

<style>

</style>