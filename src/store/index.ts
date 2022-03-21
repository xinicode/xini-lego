import { createStore } from 'vuex';
import user, { UserProps } from './user';
import templates, { TemplatesProps } from './template';
import editor, { EditorProps } from './editor';


export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}




const store = createStore<GlobalDataProps>({
  modules: {
    user, templates, editor
  }
});




export default store;

