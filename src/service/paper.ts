import {
  API_ADD_PAPER,
  API_ANSWER_PAPER_DETAIL,
  API_DELETE_PAPER_DETAIL,
  API_GENERATE_NEW_OTP,
  API_GET_PAPER_DETAIL,
  API_GET_PAPER_LIST,
  API_POST_ASSIGN_PAPER,
  API_UPDATE_PAPER_DETAIL,
  API_GET_QUESTION_EXPLANATION,
  API_GET_CHILDREN_LIST_CLASS,
} from '@/config/url-constants';
import baseQuery from './baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const paperSlice = createApi({
  reducerPath: 'papersApi',
  baseQuery,
  endpoints: builder => ({
   

    getPaperList: builder.query({
      query: ({ page = 1, pageSize = 10, search = '', filter = {}, sorting = {} }) => ({
        url: API_GET_PAPER_LIST(page, pageSize, search, filter, sorting),
        method: 'GET',
      }),
    }),
    addPaper: builder.mutation({
      query: newData => ({
        url: API_ADD_PAPER,
        method: 'POST',
        body: newData,
      }),
    }),
    
    getSinglePaper: builder.query({
      query: id => ({
        url: API_GET_PAPER_DETAIL(id),
        method: 'GET',
      }),
    }),
    updatePaper: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: API_UPDATE_PAPER_DETAIL(id),
        method: 'PUT',
        body: updatedData,
      }),
    }),
    deletePaper: builder.mutation({
      query: id => ({
        url: API_DELETE_PAPER_DETAIL(id),
        method: 'DELETE',
      }),
    }),
    assignPaper: builder.mutation({
      query: ({childId, paperId, url}) => ({
        url: API_POST_ASSIGN_PAPER(paperId),
        method: 'POST',
        body: {childId, url},
      }),
    }),
    answerPaper: builder.mutation({
      query: (updatedData) => ({
        url: API_ANSWER_PAPER_DETAIL,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    generateNewOTP: builder.mutation({
      query: id => ({
        url: API_GENERATE_NEW_OTP(id),
        method: 'POST',
      }),
    }),
    getQuestionExplanation: builder.query({
      query: ({ questionId, questionNumber }) => ({
        url: API_GET_QUESTION_EXPLANATION(questionId, questionNumber),
        method: 'GET',
      }),
    }),
    getChildrenListClass: builder.query({
      query: () => ({
        url: API_GET_CHILDREN_LIST_CLASS,
        method: 'GET',
      }),
    }),

  
  }),
});

export const {
  useGetChildrenListClassQuery,
  useGenerateNewOTPMutation,
  useAnswerPaperMutation,
  useAssignPaperMutation,
  useAddPaperMutation,
  useGetSinglePaperQuery,
  useGetPaperListQuery,
  useUpdatePaperMutation,
  useDeletePaperMutation,
  useGetQuestionExplanationQuery,
} = paperSlice;
