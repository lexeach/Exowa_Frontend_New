export const API_LOGIN = `api/users/login`;
export const API_LOGOUT = `api/logout`;
export const API_REGISTER = `api/users/register`;
export const API_CHILD_LOGIN = (id) => `api/users/childLogin/${id}`;

/****** Paper  ********/
export const API_ADD_PAPER = "/api/papers";
export const API_GET_PAPER_DETAIL = (id) => `/api/papers/${id}`;
export const API_GENERATE_NEW_OTP = (id) =>
  `/api/papers/generateQuestionOTP/${id}`;
export const API_UPDATE_PAPER_DETAIL = (id) => `/api/papers/${id}`;
export const API_ANSWER_PAPER_DETAIL = `/api/papers/answer`;
export const API_DELETE_PAPER_DETAIL = (id) => `/api/papers/${id}`;
export const API_POST_ASSIGN_PAPER = (id) =>
  `/api/papers/assign?questionId=${id}`;
export const API_GET_QUESTION_EXPLANATION = (questionId, questionNumber) => `/api/papers/${questionId}/explanation?questionNumber=${questionNumber}`;
export const API_GET_PAPER_LIST = (
  page = 1,
  pageSize = 10,
  search = "",
  filter = {},
  sorting = {}
) => {
  let filterString = "&";
  for (const key in filter) {
    if (filter[key]) {
      filterString = filterString + `&${key}=${filter[key]}&`;
    }
  }

  const sortingString = sorting?.id
    ? `&sort=${sorting.id}&order=${sorting.desc ? "desc" : "asc"}`
    : `&sort=id&order=desc`; // Default sorting if no sorting provided

  return `/api/papers?page=${page}&limit=${pageSize}${sortingString}${
    search !== "" ? `&search=${search} ${filterString}` : ` ${filterString}`
  }`;
};

/****** Children  ********/
export const API_ADD_CHILDREN = "/api/children";
export const API_GET_CHILDREN_LIST_CLASS = "api/children/classes/list";

export const API_GET_CHILDREN_DETAIL = (id) => `/api/children/${id}`;
export const API_UPDATE_CHILDREN_DETAIL = (id) => `/api/children/${id}`;
export const API_DELETE_CHILDREN_DETAIL = (id) => `/api/children/${id}`;
export const API_GET_CHILDREN_LIST = (
  page = 1,
  pageSize = 10,
  search = "",
  filter = {},
  sorting = {}
) => {
  let filterString = "&";
  for (const key in filter) {
    if (filter[key]) {
      filterString = filterString + `&${key}=${filter[key]}&`;
    }
  }

  const sortingString = sorting?.id
    ? `&sort=${sorting.id}&order=${sorting.desc ? "desc" : "asc"}`
    : `&sort=id&order=desc`; // Default sorting if no sorting provided

  return `/api/children?page=${page}&limit=${pageSize}${sortingString}${
    search !== "" ? `&search=${search} ${filterString}` : ` ${filterString}`
  }`;
};

/****** Subject  ********/
export const API_ADD_SUBJECT = "/api/subjects";
export const API_GET_SUBJECT_DETAIL = (id) => `/api/subjects/${id}`;
export const API_UPDATE_SUBJECT_DETAIL = (id) => `/api/subjects/${id}`;
export const API_DELETE_SUBJECT_DETAIL = (id) => `/api/subjects/${id}`;
export const API_GET_SUBJECT_LIST_Mutation = `/api/subjects/?page=${1}&limit=${1000}`;
export const API_GET_SUBJECT_LIST = (
  page = 1,
  pageSize = 10,
  search = "",
  filter = {},
  sorting = {}
) => {
  let filterString = "&";
  for (const key in filter) {
    if (filter[key]) {
      filterString = filterString + `&${key}=${filter[key]}&`;
    }
  }

  const sortingString = sorting?.id
    ? `&sort=${sorting.id}&order=${sorting.desc ? "desc" : "asc"}`
    : `&sort=id&order=desc`; // Default sorting if no sorting provided

  return `/api/subjects?page=${page}&limit=${pageSize}${sortingString}${
    search !== "" ? `&search=${search} ${filterString}` : ` ${filterString}`
  }`;
};

/****** Syllabus  ********/
export const API_ADD_SYLLABUS = "/api/syllabuses";
export const API_GET_SYLLABUS_DETAIL = (id) => `/api/syllabuses/${id}`;
export const API_UPDATE_SYLLABUS_DETAIL = (id) => `/api/syllabuses/${id}`;
export const API_DELETE_SYLLABUS_DETAIL = (id) => `/api/syllabuses/${id}`;
export const API_GET_SYLLABUS_LIST_OPTION = `/api/syllabuses?page=${1}&limit=${1000}`;

export const API_GET_SYLLABUS_LIST = (
  page = 1,
  pageSize = 10,
  search = "",
  filter = {},
  sorting = {}
) => {
  let filterString = "&";
  for (const key in filter) {
    if (filter[key]) {
      filterString = filterString + `&${key}=${filter[key]}&`;
    }
  }

  const sortingString = sorting?.id
    ? `&sort=${sorting.id}&order=${sorting.desc ? "desc" : "asc"}`
    : `&sort=id&order=desc`; // Default sorting if no sorting provided

  return `/api/syllabuses?page=${page}&limit=${pageSize}${sortingString}${
    search !== "" ? `&search=${search} ${filterString}` : ` ${filterString}`
  }`;
};
