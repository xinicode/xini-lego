import { createStore } from 'vuex';
import user, { UserProps } from './user';
import templates, { TemplatesProps } from './template';



export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
}




const store = createStore<GlobalDataProps>({
  modules: {
    user, templates
  }
});




export default store;

