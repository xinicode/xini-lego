import { Module } from 'vuex';

import { GlobalDataProps } from './index';

export interface TemplateProps {
  id: string;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number;
  user: object;
}

const testData: TemplateProps[] = [
  {
    id: '123',
    title: 'npm startAA',
    coverImg: 'assets/img.png',
    author: 'true',
    copiedCount: 123,
    user: {
      gender: 'true',
      nickName: 'string',
      picture: 'string',
      userName: 'string',
    },
  },
  {
    id: '123',
    title: 'string',
    coverImg: 'img.png',
    author: 'true',
    copiedCount: 123,
    user: {
      gender: 'true',
      nickName: 'string',
      picture: 'string',
      userName: 'string',
    },
  },
  {
    id: '123',
    title: 'string',
    coverImg: 'img.png',
    author: 'true',
    copiedCount: 123,
    user: {
      gender: 'true',
      nickName: 'string',
      picture: 'string',
      userName: 'string',
    },
  },
  {
    id: '123',
    title: 'string',
    coverImg: 'img.png',
    author: 'true',
    copiedCount: 123,
    user: {
      gender: 'true',
      nickName: 'string',
      picture: 'string',
      userName: 'string',
    },
  },
];

export interface TemplatesProps {
  data: TemplateProps[];
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
};

export default templates;
