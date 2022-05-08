<template>
  <div class="registerArea">
    <div class="innerArea">
      <div class="line">
        <span>제목</span>
        <input type="text" v-model="qnaData.title" disabled>
      </div>
      <div class="line">
        <span>사용자 ID :</span>
        <input type="text" v-model="qnaData.customer_id" disabled>
      </div>
      <div class="line">
        <label>사용자 이름 :</label>
        <input type="text" v-model="qnaData.name" disabled>
      </div>
      <div class="line">
        <span>내용 :</span>
        <textarea type="text" v-model="qnaData.contents" disabled></textarea>
      </div>
      <div class="line">
        <span>상태 :</span>
        <input type="text" id="txtStatus" v-model="qnaData.status" readonly>
      </div>
      
      <div class="line2" v-if="qnaData.status === 'submit'">
        <button class="longBtn" @click="assignQna">나에게 할당하기</button>
      </div>

      <div v-if="qnaData.status !== 'submit'">
        <div class="line">
          <span>상담사 : </span>
          <input type="text" readonly v-model="qnaData.managerName">
        </div>

        <div class="line">
          <span>답변일시 : </span>
          <input type="text" readonly v-model="qnaData.answer.createdAt">
        </div>

        <div class="line">
          <span>답변 : </span>
          <textarea  v-model="qnaData.answer.reply" ></textarea>
        </div>
        <div class="line2">
          <button @click="saveQna">저장하기</button>
          <button @click="cancel">돌아가기</button>
        </div>
      </div>    
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      qnaData : {
        customer_id: '',
        name: '',
        title: '',
        contents: '',
        status: '',
        managerName: '',
        managerId: '',
        answer: {
          reply: '',
          createdAt: '',
        }
      },
      answer: ''
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.getQna();
  },
  methods: {
    getQna() {
      this.$http.get(`/qna/${this.id}`).then(r => {
        this.qnaData = JSON.parse(JSON.stringify(r.data));
        
        if(this.qnaData['answer'] === undefined || this.qnaData.answer === null) {
          this.qnaData.answer = {reply : '', createdAt: ''}
        } else {
          if(this.qnaData.answer.createdAt !== '') {
            this.qnaData.answer.createdAt = new Date(this.qnaData.answer.createdAt).toLocaleString();
          }
        }
      });
    },
    assignQna() {
      if(confirm('해당 문의건을 할당 하시겠습니까?')) {
        this.$http.post(`/qna/assign/${this.qnaData.id}`, {managerId: this.userInfo.id}).then(r => {
          this.qnaData = r.data;
          if(this.qnaData['answer'] === undefined || this.qnaData.answer === null) {
            this.qnaData.answer = {reply : '', createdAt: ''}
          }
        }).catch(error => {        
          alert(`Error Code : ${error.response.data.code} \nMessage : ${error.response.data.msg}` );
        });
      }
    },
    saveQna() {
      if(confirm('답변을 저장 하시겠습니까?')) {
        this.$http.post(`/qna/answer/${this.qnaData.id}`, {reply: this.qnaData.answer.reply, user: {id: this.userInfo.id}}).then(r => {
          this.qnaData = r.data;
           if(this.qnaData.answer && this.qnaData.answer.createdAt !== '') {
            this.qnaData.answer.createdAt = new Date(this.qnaData.answer.createdAt).toLocaleString();
          }
          alert('저장 되었습니다.')
        }).catch(error => {
          this.qnaData.answer.reply = '';
          alert(`Error Code : ${error.response.data.code} \nMessage : ${error.response.data.msg}` );
        });
      }
    },
    cancel() {
      this.$router.push('/admin/view');
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

button.longBtn {
  margin-top: 20px;
  width: 170px;
}

button:first-child {
  margin-right: 20px;
}

textarea {
  float: right;
  width: 250px;
  height: 120px;
}

</style>