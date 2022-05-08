/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import axios from 'axios';
import VueRouter from'vue-router';
import flushPromises from 'flush-promises';
import ChangeQnAView from '@/app/admin/ChangeQnAView.vue';
import { qnaListResponse, qnaResponse, qnaAssignResponse, answerResponse } from './responseData';
import QnAListView from '@/app/admin/ListQnAView.vue';
import App from '@/app/admin/App.vue';
import LoginView from '@/app/admin/LoginView.vue';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

jest.mock('axios');

describe('App.vue(Admin)', () => {
  beforeAll(() => {        
      // Confirm 창이 출력 됐을 경우 yes 로 넘기도록 하는 설정
      global.confirm = jest.fn(() => true);        
      global.alert = jest.fn(() => true);
  });
  let store;
  let router;


  beforeEach(() => {
      const state = {
          isLogin: true,
          user: {
            name : 'admin'
          }
      }

      store = new Vuex.Store({
          state,
          getters: {
            user(state) {
              return state.user;
            },
            isLogin(state) {
              return state.isLogin
            }
          },
          actions: {
            doLogin: jest.fn().mockImplementation(() => {
              return {data: { name: 'admin' }}
            })
          }
      });

      router = new VueRouter();
  });

  it('로그인 상태면 로그아웃 버튼이 보인다.', () => {
      const wrapper = shallowMount(App, {
          store,
          localVue
      });

      expect(wrapper.find("button").text()).toBe("로그아웃");        
  });

  it('로그인 버튼 동작 확인', async () => {
      const wrapper = shallowMount(LoginView, {
        localVue,
        router,
        store       
      });

      const alertSpy = jest.spyOn(window, 'alert');
      
      wrapper.find('button').trigger('click');
      await flushPromises();
      
      //로그인 alert 메세지 호출 되었는지 확인
      expect(alertSpy).toHaveBeenCalled();

      //이동 path 확인
      expect(wrapper.vm.$route.path).toBe('/admin/view');
  });
  
});

describe('App.vue(Admin)', () => {
  it('목록 조회 동작 확인', () => {

    axios.get.mockResolvedValue(qnaListResponse);      
      
    const wrapper = shallowMount(QnAListView, { 
        mocks: {
            $http : axios
        }
    });

    wrapper.find('button').trigger('click');    
    wrapper.vm.$nextTick(() => {
      
      const tds = wrapper.findAll('table > tbody > tr > td');
      expect(tds.at(1).element.innerText).toBe('user1');

      const trs = wrapper.findAll('table > tbody > tr');
      expect(trs.at(1).findAll('td').at(1).element.innerText).toBe('user2');
    });
  });
});

describe('ChangeQnAView.vue', () => {
  let store;
  beforeEach(() => {
    axios.mockReset();
    const state = {
      isLogin: true,
      user: {
        id: 'admin',
        name : 'admin'
      }
    }

    store = new Vuex.Store({
      state,
      getters: {
        user(state) {
          return state.user;
        }
      }
    });
  });
    
  beforeAll(() => {        
      // Confirm 창이 출력 됐을 경우 yes 로 넘기도록 하는 설정
      global.confirm = jest.fn(() => true);
      global.alert = jest.fn(() => true);
  });

  it('Q&A 내용 출력 및 할당하기 버튼 출력 확인', async () => {
    axios.get.mockResolvedValue(qnaResponse);

    const wrapper = shallowMount(ChangeQnAView, {
        localVue,        
        store,
        propsData: {
            id: 1
        },          
        mocks: {
            $http: axios
        }
    });

    await wrapper.vm.$nextTick();
    
    const inputs = wrapper.findAll('input');
    
    //상태가 submit 인지 확인
    expect(inputs.at(3).element.value).toBe('submit');

    const button = wrapper.find('button');
    
    //submit 이면 할당하기 버튼 확인
    expect(button).toBeDefined();

    //버튼에 출력된 text 확인
    expect(button.element.textContent).toBe('나에게 할당하기');
  });

  it('나에게 할당하기 확인', async () => {
      
    axios.get.mockResolvedValue(qnaResponse);
    axios.post.mockResolvedValue(qnaAssignResponse);
    
    const wrapper = shallowMount(ChangeQnAView, {
      propsData: {
        id: 1
      },          
      store,
      localVue,
      mocks: {
        $http: axios,
      },
    });
    
    const assign = jest.fn();
    //assignQna method 호출시 status를 assign 로 바꿔주는 mocking
    assign.mockImplementation( () => {
        wrapper.vm.$data.qnaData.status = 'assign'
    });

    wrapper.vm.assignQna = assign
    wrapper.vm.saveQna =jest.fn();

    //할당하기 버튼 click 트리거 한다.
    wrapper.find('button').trigger('click');
    
    await flushPromises();

    //답변 입력 textarea 가 출력된다.
    expect(wrapper.find('textarea')).toBeDefined();

  });

  it('할당하기 테스트', async () => {
      
    // qna get 했을 때 return mocking        
    axios.get.mockResolvedValue(qnaAssignResponse);

    // qna 저장하기 했을 때 return mocking
    axios.post.mockResolvedValue(answerResponse);
    
    const wrapper = shallowMount(ChangeQnAView, {
      propsData: {
        id: 1
      },
      localVue,      
      store,
      mocks: {
        $http: axios,
          
      },
      computed: {
        userInfo() {
            return {id: 'admin'}
        }
      }
    });
            
    // 답변 입력 textarea 출력 확인
    expect(wrapper.findAll('textarea').at(1)).toBeDefined();
    
    // 저장하기 클릭
    wrapper.findAll('button').at(0).trigger('click');
    
    await flushPromises();

    // 답변 확인
    expect(wrapper.findAll('textarea').at(1).element.value).toBe('충전기를 교체하세요.');

    // 상태 확인
    expect(wrapper.findAll('input').at(3).element.value).toBe('complete');

  });
    
});
