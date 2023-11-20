import { privateAxios } from "./Helper";

export const addHoliday = (holiday) => {
  return privateAxios.post("/holidays/add", holiday).then((resp) => resp.data);
};

export const getAllHoliday = () => {
  return privateAxios.get("/holidays/list").then((resp) => resp.data);
};
