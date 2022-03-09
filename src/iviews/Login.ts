import { defineComponent, reactive, ref, toRaw } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';


export default defineComponent({
  name: "login",
  components: {
    UserOutlined
  },
  setup() {
    const formRef = ref();
    const formState = reactive({
      cellphone: "",
      cellphone2: "",
    });
    const login = () => {
      console.log(formState);
      formRef.value.validate().then(() => {
        console.log(toRaw(formState));
      }).catch((error: ValidateErrorEntity) => {
        console.log(error);
      });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const rules = {
      cellphone: [
        { required: true, message: "不能为空", trigger: 'blur' }
      ],
      cellphone2: [
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ]
    };
    return {
      formState, login, formRef, resetForm, rules
    };
  }
});