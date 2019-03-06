import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

const baseUrl = publicRuntimeConfig.baseUrl;
const keywordsUrl = `${baseUrl}/api/keywords`;
const articlesUrl = `${baseUrl}/api/articles/keywords/`;

export const getKeywords = async () => {
  const res = await fetch(keywordsUrl).then(r => r.json());
  return res;
};

export const getArticlesByKeyword = async word => {
  const res = await fetch(`${articlesUrl}${word}`).then(r => r.json());
  return res;
};
