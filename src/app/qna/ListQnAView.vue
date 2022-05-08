<template>
  <div>
    <div style=“display:table-row;”>
      <label>사용자 ID</label><input type="text" v-model="qnaData.customerId" @keyup.enter="search"/>
      <label>이름</label><input type="text" v-model="qnaData.name" @keyup.enter="search"/>
      <label>제목</label><input type="text" v-model="qnaData.title" @keyup.enter="search"/>
      <button @click="search">목록 조회</button>
    </div>
    
    <div id="tablearea" ref="tablediv"></div>  
  </div>
</template>

<script>
import StatusConst from '@/common/status_const';

export default {
  data() {
    return {
      qnaData : {
        customerId: '',
        name: '',
        title: '',
        contents: '',
      }
    }
  },
  mounted() {
    this.search();
  },
  methods : {
    search() {
      this.$http.get(`/qna?customerId=${this.qnaData.customerId}&name=${this.qnaData.name}&title=${this.qnaData.title}`).then(res => {        
        this.drawTable(res.data);
      });
    },
    drawTable(datas) {
      if(!datas) {
        return;
      }

      while(this.$refs.tablediv.hasChildNodes()) {
        this.$refs.tablediv.removeChild(this.$refs.tablediv.firstChild);
      }

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      
      const thead_tr = document.createElement("tr");

      const th_td1 = document.createElement('th');
      const th_td2 = document.createElement('th')
      const th_td3 = document.createElement('th')
      const th_td4 = document.createElement('th')
      const th_td5 = document.createElement('th')
      const th_td6 = document.createElement('th');

      th_td1.innerText = "No.";
      th_td1.style.width = '60px';
      th_td2.innerText = "사용자 ID";
      th_td2.style.width = '120px';
      th_td3.innerText = "이름";
      th_td3.style.width = '120px';
      th_td4.innerText = "제목";
      th_td4.style.width = '250px';
      th_td5.innerText = "등록일시";
      th_td5.style.width = '220px';
      th_td6.innerText = "상태";
      th_td6.style.width = '80px';

      thead_tr.appendChild(th_td1);
      thead_tr.appendChild(th_td2);
      thead_tr.appendChild(th_td3);
      thead_tr.appendChild(th_td4);
      thead_tr.appendChild(th_td5);
      thead_tr.appendChild(th_td6);
      thead.appendChild(thead_tr);

      datas.forEach(rows => {
        const tr = document.createElement('tr');
        
        const td = document.createElement('td');
        //td.innerText = rows.id;
        const atag = document.createElement('a');
        atag.href = '#';
        atag.onclick =  () => {
          const inputPass = prompt('비밀번호를 입력하세요');
          this.$http.get(`/qna/${rows.id}/pass`, {params: { password : inputPass }} ).then((r) => {
            this.$router.push(`/qna/view/${rows.id}`);
          }).catch((err) => {
            console.log(err);
            if(err && err.data) {
              alert(err.data.msg);
            } else {
              alert('관리자에게 문의 바랍니다.');
            }
            this.$router.push(`/qna/view`);
          })
          
        }
        atag.innerText = rows.id;
        td.appendChild(atag);
        const td1 = document.createElement('td');
        td1.innerText = rows.customer_id;
        const td2 = document.createElement('td');
        td2.innerText = rows.name;
        const td3 = document.createElement('td');
        td3.innerText = rows.title;
        
        const td4 = document.createElement('td');
        td4.innerText = new Date(rows.createdAt).toLocaleString();

        const td5 = document.createElement('td');
        td5.innerText = StatusConst[rows.status];

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      })
      
      table.appendChild(thead);
      table.appendChild(tbody);
      
      this.$refs.tablediv.appendChild(table);
    },    
  }
}
</script>

<style scoped>
label {
  margin-right: 12px;
}

input {
  margin-right: 12px;
  width: 200px;
  height: 19px;
}
</style>