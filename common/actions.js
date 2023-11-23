'use server';
import { getClient } from '@/graphql/apollo-server';
import { notFound } from 'next/navigation';
import { initialVariables } from './constants';

export const fetchAPI = async (query, variables = initialVariables) => {
  try {
    const { data } = await getClient().query({
      query,
      variables,
    });
    return data;
  } catch (error) {
    notFound();
  }
};
