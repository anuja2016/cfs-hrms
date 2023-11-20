import { privateAxios } from "./Helper";

// Function to fetch the list of attendances
export const getAttendanceReportList = () => {
  return privateAxios.get("/api/report-attendance/all")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};



// Function to create a new attendance
export const createAttendance = (attendance) => {
  return privateAxios.post("/api/attendances/", attendance)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};


export const getAttendanceListById = (attendanceId) => {
  return privateAxios.get(`/api/attendances/${attendanceId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

// Function to fetch attendance by ID and date
export const getAttendanceListByIdAndDate = (employeeId, date) => {
  return privateAxios.get(`/api/attendances/employee/{employeeId}`, {
    params: { date },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};
