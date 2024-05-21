/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../apiSlice"
const TASK_URL = "/task"
export const taskApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
      // create
      createTask: build.mutation({
        query: (data) => ({
          url: `${TASK_URL}/create-task`,
          method: "POST",
          data,
        }),
      }),
  
      // get all
      allTask: build.query({
        query: (arg: Record<string, any>) => {
          return {
            url: TASK_URL,
            method: "GET",
            params: arg,
          }
        },
       
      }),

    // delete
      deleteTask: build.mutation({
        query: (id) => ({
          url: `${TASK_URL}/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  })
  
  export const {
 useCreateTaskMutation,
  useAllTaskQuery,
  
  useDeleteTaskMutation
  } = taskApi