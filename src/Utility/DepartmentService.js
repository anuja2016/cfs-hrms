import { privateAxios } from "./Helper"

export const getAllDepartments = () => {
    return privateAxios.get(`/api/departments/`).then((resp) => resp.data);
  };