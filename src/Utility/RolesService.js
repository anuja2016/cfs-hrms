import { privateAxios } from "./Helper"

export const getAllRoles = () => {
    return privateAxios.get(`/api/roles/`).then((resp) => resp.data);
  };