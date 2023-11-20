import { privateAxios } from "./Helper"

export const getEmployee = (empId) => {
    return privateAxios.get(`/api/employees/${empId}`).then((resp) => resp.data);
  };

  export const getAllEmployees = (pageNumber, pageSize) => {
    return privateAxios.get(`/api/employees/?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((resp) => resp.data);
  };

  export const addEmployee = (employee) => {
    return privateAxios.post("/api/employees/", employee).then((resp) => resp.data);
  };

  export const deleteEmployee = (empId) => {
    return privateAxios.delete(`/api/employees/${empId}`).then((resp) => resp.data);
  };

  export const updateEmployee = (empId, employee) => {
    return privateAxios.put(`/api/employees/${empId}`, employee).then((resp) => resp.data);
  };

  export const getEmployeeBirthdays = () => {
    return privateAxios.get("/api/employees/upcoming-birthdays").then((resp) => resp.data);
  };
  
  export const getEmployeeAnniversaries = () => {
    return privateAxios.get("/api/employees/upcoming-anniversaries").then((resp) => resp.data);
  };

  export const generateSalarySlip = (formData) => {
    return privateAxios.post("/api/salary/generate-slips", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((resp) => resp.data);
};
