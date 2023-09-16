"use client";
import { create } from "zustand";
import axios from "axios";

import { UserState, UserAction } from "@/lib/types";

const get_users = async () => {
  const response = await axios.get(`${location.origin}/api/users`);
  return response.data;
};

const useUserStore = create<UserState & UserAction>((set) => ({
  users: [],
  getUsers: () => {
    return get_users().then((users) => {
      return set({ users: [{ user_id: "", name: "Unassign" }, ...users] });
    });
  },
}));

export { useUserStore };
