import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router'; 
import router from '@/router/index';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App.vue', () => {
    it('링크 출력 확인', () => {
      const wrapper = shallowMount(App, {
          localVue, 
          router            
      });

      //a tag 2개 확인
      expect(wrapper.findAll('a').exists()).toBe(true);
    });

    it('사용자 페이지로 이동 확인', () => {
      const wrapper = shallowMount(App, {
          localVue, 
          router
      });

      //a tag 클릭
      wrapper.find('a').trigger('click');

      expect(wrapper.vm.$route.path).toBe('/qna');
  });

  it('Admin 페이지로 이동 테스트', () => {
    const wrapper = shallowMount(App, {            
        localVue,
        router
    });

    wrapper.findAll('a').at(1).trigger('click');
    
    expect(wrapper.vm.$route.path).toBe('/admin');
      
  });
});
