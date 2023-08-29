import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Expense {
  description: string;
  amount: number;
  category: string;
  id: number;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => "/expenses",
      transformResponse: (data: Expense[]) => {
        return [...data].reverse();
      },
      providesTags: ["Expenses"],
    }),

    createExpense: builder.mutation<Expense, Expense>({
      query: (expense) => ({
        url: "/expenses",
        method: "POST",
        body: expense,
      }),

      async onQueryStarted(expense, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getExpenses", undefined, (draft) => {
            draft.unshift(expense);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateExpense: builder.mutation<Expense, Expense>({
      query: (expense) => ({
        url: `/expenses/${expense.id}`,
        method: "PUT",
        body: expense,
      }),
      // optimistic update
      async onQueryStarted(expense, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getExpenses", undefined, (draft) =>
            draft.map((exp) => (exp.id === expense.id ? expense : exp))
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteExpense: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = apiSlice;
