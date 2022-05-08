import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import axios from 'axios';
import { qnaListResponse } from './responseData';
import QnAView from '@/app/qna/ListQnAView.vue';
import router from '@/router/qna';
import VueRouter from 'vue-router'; 
import App from '@/app/qna/App.vue';
import flushPromises from 'flush-promises';
import RegisterQnAView from '@/app/qna/RegisterQnAView.vue';

jest.mock('axios');

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
  //router-link 로 이동 시 path 확인 안되어 skip 처리함
  xit('Q&A 등록 이동 확인(사용자)', async () => {
    const wrapper = shallowMount(App, { 
        localVue, 
        router,
        stubs: ['router-link', 'router-view']
        // stubs: {
        //   RouterLink: RouterLinkStub
        // }
    });
    
    //wrapper.get("nav").findAllComponents({ name: "router-link" }).at(1).trigger('click');
    wrapper.findAll('a').at(1).trigger('click');
    
    await wrapper.vm.$nextTick()    
    expect(wrapper.vm.$route).toBe('/qna/register');    
        
  });
});

describe('QnAView.vue', () => {
  it('Q&A 목록 조회 확인(사용자)', async () => {
    
    axios.get.mockResolvedValue(qnaListResponse);
    
    const wrapper = shallowMount(QnAView, { 
        mocks: {
            $http: axios
        }
     });

    await wrapper.vm.$nextTick();
        
    const td = wrapper.findAll('table > tbody > tr > td');
        
    expect(td.at(1).element.innerText).toBe('user1');
    expect(td.at(2).element.innerText).toBe('사용자1');
        
  });
});

describe('RegisterQnAView.vue', () => {
  beforeAll(() => {
    // we define alert to be a function that returns true
    global.alert = jest.fn(() => true);        
  });

  it('Q&A 등록 확인(사용자)', async () => {
    const spy = jest.spyOn(window, 'alert');
    axios.post.mockResolvedValue(false);
    
    const wrapper = shallowMount(RegisterQnAView, {
      localVue, 
      router,
      mocks: {
          $http: axios
      },
     });

    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    await flushPromises();
    
    //alert 호출 되었는지 확인
    expect(spy).toBeCalledTimes(1);

    // view 화면으로 이동하였는지 확인
    expect(wrapper.vm.$route.path).toBe('/qna/view');        
  });
});