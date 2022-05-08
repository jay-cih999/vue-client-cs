const qnaListResponse = {
  data : [
    {
        id: 1,
        customer_id: 'user1',
        name: '사용자1',
        title: '문의 1',
        contents: '충전 X',          
    }, 
    {
          id: 2,
          customer_id: 'user2',
          name: '사용자2',
          title: '문의 2',
          contents: '화면 X',          
    }
  ] 
};

const qnaResponse = {
  data : {
    id: 1,
        customer_id: 'user1',
        name: '사용자1',
        title: '문의 1',
        contents: '충전 X',
        status: 'submit'
  }
};

const qnaAssignResponse = {
  data : {
    id: 1,
        customer_id: 'user1',
        name: '사용자1',
        title: '문의 1',
        contents: '충전 X',
        status: 'assign',
        answer: {
          reply: ''
        }
  }
};

const answerResponse = {
  data : {
          id: 1,
          customer_id: 'user1',
          name: '사용자1',
          title: '문의 1',
          contents: '충전 X',
          status: 'complete',
          answer : {
              reply: '충전기를 교체하세요.'
          }
          
  }
};

export { qnaListResponse, qnaResponse, qnaAssignResponse, answerResponse };