import { privateAxios } from "./Helper";

// Function to create a new leave request
export const createLeave = (leave) => {
    return privateAxios.post("/api/leaves/", leave)
        .then((response) => response.data)
        .catch((error) => {
            throw error.response.data;
        });
};

// Function to get a list of all leaves
export const getLeaves = () => {
    return privateAxios.get("/api/leaves/")
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };
  
  // Function to get a leave by its ID
  export const getLeaveById = (leaveId) => {
    return privateAxios.get(`/api/leaves/${leaveId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };
  
  // Function to update a leave by its ID
  export const updateLeaveById = (leaveId, leave) => {
    return privateAxios.put(`/api/leaves/${leaveId}`, leave)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };
  
  // Function to delete a leave by its ID
  export const deleteLeaveById = (leaveId) => {
    return privateAxios.delete(`/api/leaves/${leaveId}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  };