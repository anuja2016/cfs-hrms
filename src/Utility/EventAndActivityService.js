import { privateAxios } from "./Helper";

export const addEventAndActivity = (eventAndActivityData) => {
  return privateAxios.post("/events-and-activities/add", eventAndActivityData).then((resp) => resp.data);
};

export const getAllEventAndActivity = () => {
  return privateAxios.get("/events-and-activities/list").then((resp) => resp.data);
};
