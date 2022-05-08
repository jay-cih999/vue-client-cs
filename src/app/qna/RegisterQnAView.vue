<template>
  <div class="registerArea">
    <div class="innerArea">
      <div class="line"><span>제목</span><input type="text" v-model="qnaData.title"></div>
      <div class="line"><span>사용자 ID</span><input type="text" v-model="qnaData.customer_id"></div>
      <div class="line"><span>비밀번호</span><input type="text" v-model="qnaData.password"></div>
      <div class="line"><span>이름</span><input type="text" v-model="qnaData.name"></div>
      <div class="line"><span>내용</span><textarea v-model="qnaData.contents"></textarea></div>

      <div class="line2">
        <button @click="registerQna">등록</button>
        <button @click="cancel">취소</button>
      </div> 
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      qnaData : {
        customer_id: '',
        name: '',
        title: '',
        contents: '',
        password: '',
      }
    }
  },
  methods: {
    registerQna() {      
      this.$http.post('/qna', this.qnaData).then(r => {        
        alert('문의 등록이 완료되었습니다.');
        this.$router.push('/qna/view');
      }).catch(error => {        
        if(error.response.data.errors && error.response.data.errors.length > 0) {
          let msg = '';
          error.response.data.errors.forEach(err => {
            msg += err.defaultMessage + "\n";
          });
          alert(msg);
        } else if(error.response.data.code) {
          alert(error.response.data.msg);
        }
      });
    },
    cancel() {
      this.$router.push('/qna/view');
    }
  }
}
</script>

<style scoped>
.registerArea {
  text-align: center;
}

.innerArea {
  display: inline-block;
  width: 400px;
}

.line {    
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 250%;
}

.line2 {    
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 250%;
}

span {    
  
  float: left;
}

input {
  float: right;
  width: 250px;
}

button {
  margin-top: 20px;
  width: 70px;
}

button:first-child {
  margin-right: 20px;
}

textarea {
  float: right;
  width: 300px;
  height: 200px;
}
</style>