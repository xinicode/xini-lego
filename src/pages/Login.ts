import router from '@/router';
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'login',
  components: {
    UserOutlined,
  },
  props: {
    list: [],
  },
  setup() {
    const store = useStore();
    const formRef = ref();
    const formState = reactive({
      cellphone: '',
      cellphone2: '',
    });
    const login = () => {
      // console.log(formState);
      // formRef.value.validate().then(() => {
      //   console.log(toRaw(formState));
      // }).catch((error: ValidateErrorEntity) => {
      //   console.log(error);
      // });
      localStorage.setItem('USERTOKEN', 'bG9jYWw6YzA5OTUxZTctNWNlOC00YjJhLTllNzYtOTM5OTZjMTQ0YTMw');
      store.commit('login');
      router.push('/');
      console.log('a');
    };
    const resetForm = () => {
    formRef.value.resetFields();
    };
    const rules = {
      cellphone: [{ required: true, message: '不能为空', trigger: 'blur' }],
      cellphone2: [{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }],
    };
    return {
      formState,
      login,
      formRef,
      resetForm,
      rules,
    };
  },
});
