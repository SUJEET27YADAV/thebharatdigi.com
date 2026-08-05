"use client";

import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";
import type { AdminRow } from "./AdminTable";

type State<T> = {
  items: T[];
  searchTerm: string;
  loading: boolean;
};

type Action<T> =
  | { type: "SET_DATA"; payload: T[] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, items: action.payload, loading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

type UseAdminListMessages = {
  success: string;
  deleteError: string;
  loadError: string;
};

type UseAdminListOptions<T extends { id: string }> = {
  initialItems: T[];
  listPath: string;
  deletePath: string;
  deleteConfirm: (item: AdminRow) => string;
  messages: UseAdminListMessages;
};

export function useAdminList<T extends { id: string }>({
  initialItems,
  listPath,
  deletePath,
  deleteConfirm,
  messages,
}: UseAdminListOptions<T>) {
  const { success, deleteError, loadError } = messages;

  const [state, dispatch] = useReducer(reducer<T>, {
    items: initialItems,
    searchTerm: "",
    loading: false,
  });

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(listPath);
      if (response.ok) {
        const res = await response.json();
        if (res.success) {
          dispatch({ type: "SET_DATA", payload: (res.data || []) as T[] });
        } else {
          dispatch({ type: "SET_DATA", payload: [] });
          toast.error(res.msg || loadError);
        }
      } else {
        const res = await response.json();
        if (Array.isArray(res.data)) {
          dispatch({ type: "SET_DATA", payload: res.data as T[] });
        } else {
          throw new Error("Failed to fetch data");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(loadError);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [listPath, loadError]);

  const removeItem = useCallback(
    async (item: AdminRow) => {
      if (confirm(deleteConfirm(item))) {
        try {
          const response = await fetch(deletePath, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: item.id }),
          });
          if (!response.ok) {
            const res = await response.json();
            toast.error(res.msg || deleteError);
            return;
          }
          const res = await response.json();
          if (res.success) {
            toast.success(res.msg || success);
            fetchItems();
          } else {
            toast.error(res.msg || deleteError);
          }
        } catch (err) {
          console.error(err);
          toast.error(deleteError);
        }
      }
    },
    [deletePath, deleteConfirm, success, deleteError, fetchItems],
  );

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: "SET_SEARCH", payload: term });
  }, []);

  return {
    items: state.items,
    searchTerm: state.searchTerm,
    loading: state.loading,
    setSearchTerm,
    fetchItems,
    removeItem,
  };
}
