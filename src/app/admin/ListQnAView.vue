<template>
  <div>
    <div style=“display:table-row;”>
      <span>사용자ID</span><input type="text" v-model="qnaData.customerId" @keyup.enter="search"/>
      <span>사용자 이름</span><input type="text" v-model="qnaData.name" @keyup.enter="search"/>
      <span>제목</span><input type="text" v-model="qnaData.title" @keyup.enter="search"/>
      <span>상태</span>
      <select v-model="qnaData.status" multiple>
        <option v-for="option of statusOptions" :key="option.value" :value="option.value" :selected="option.value === qnaData.status">
          {{option.text}}
        </option>
      </select>
      <button @click="search">조회</button>
    </div>

    <div id="tablearea" ref="tablediv"></div>
  </div>
</template>

<script>
import StatusConst from '@/common/status_const';

const statusOptions = [{text: '등록', value: 'submit'},{text: '할당', value: 'assign'},{text: '완료', value: 'complete'}]

export default {
  data() {
    return {
      qnaData : {
        customerId: '',
        name: '',
        title: '',
        contents: '',
        status: ['submit']
      },
      timer: null,
      statusOptions: statusOptions
    }
  },
  mounted() {
    this.search();
    this.polling();
  },
  destroyed() {    
    clearInterval(this.timer);
  },
  methods : {
    polling() {
      this.timer = setInterval(()=> {
        this.search()
      }, 10000);
    },    
    search() {
      this.$http.get(`/qna?customerId=${this.qnaData.customerId}&name=${this.qnaData.name}&title=${this.qnaData.title}&status=${this.qnaData.status}`).then(res => {        
        this.drawTable(res.data);
      })
    },
    drawTable(datas) {      
      while(this.$refs.tablediv && this.$refs.tablediv.hasChildNodes()) {
        this.$refs.tablediv.removeChild(this.$refs.tablediv.firstChild);
      }

      if(!datas) {
        return;
      }
      
      
      const table = document.createElement("table");
      table.style.border= '1px solid black';
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      
      const thead_tr = document.createElement("tr");

      const th_td1 = document.createElement('th');
      const th_td2 = document.createElement('th');
      const th_td3 = document.createElement('th');
      const th_td4 = document.createElement('th');
      const th_td5 = document.createElement('th');
      const th_td6 = document.createElement('th');
      const th_td7 = document.createElement('th');
      const th_td8 = document.createElement('th');

      th_td1.innerText = "No.";
      th_td1.style.width = '60px';
      th_td2.innerText = "사용자 ID";
      th_td2.style.width = '120px';
      th_td3.innerText = "이름";
      th_td3.style.width = '120px';
      th_td4.innerText = "제목";
      th_td4.style.width = '250px';
      th_td5.innerText = "등록 일시";
      th_td5.style.width = '240px';
      th_td6.innerText = "상태";
      th_td6.style.width = '80px';
      th_td7.innerText = "상담사";
      th_td7.style.width = '120px';
      th_td6.innerText = "상태";
      th_td6.style.width = '80px';
      th_td8.innerText = '답변 일시';
      th_td8.style.width = '240px';


      thead_tr.appendChild(th_td1);
      thead_tr.appendChild(th_td2);
      thead_tr.appendChild(th_td3);
      thead_tr.appendChild(th_td4);
      thead_tr.appendChild(th_td5);
      thead_tr.appendChild(th_td7);
      thead_tr.appendChild(th_td6);
      thead_tr.appendChild(th_td8);
      thead.appendChild(thead_tr);

      datas.forEach(rows => {
        const tr = document.createElement('tr');
        
        const td = document.createElement('td');
        const atag = document.createElement('a');
        
        //atag.href =  `/admin/qnaview/${rows.id}`;
        atag.href = '#';
        atag.onclick =  () => {
          this.$router.push(`/admin/view/${rows.id}`);
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
        td4.innerText = rows.createdAt === null ? '' : new Date(rows.createdAt).toLocaleString();

        const td5 = document.createElement('td');
        td5.innerText = StatusConst[rows.status];

        const td6 = document.createElement('td');
        td6.innerText = rows.managerName;

        const td7 = document.createElement('td');
        td7.innerText = rows.answeredAt === null ? '' : new Date(rows.answeredAt).toLocaleString();

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td6);
        tr.appendChild(td5);        
        tr.appendChild(td7);  
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
span {
  margin-right: 12px;
}

input {
  margin-right: 12px;
  width: 150px;
  height: 19px;
}

select {
  margin-right: 12px;
  width: 150px;  
}
</style>