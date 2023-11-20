import { getAllEmployees } from "../Utility/EmployeeService";
import { useEffect, useState } from "react";
import { deleteEmployee } from "../Utility/EmployeeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink, Container, Card, CardBody, CardHeader, CardText, Button } from 'reactstrap'
import { initialPageNumber, initialPageSize } from "../Utility/Constants";
import { getAllDepartments } from "../Utility/DepartmentService";

const RightPanelEmployeeList = () => {
  const [employeesData, setEmployeesData] = useState({
    employeeData: [],
    totalPages: '',
    totalElements: '',
    pageSize: '',
    lastPage: false,
    pageNumber: ''
  });
  const navigate = useNavigate();
  const [departmentsData, setDepartmentsData] = useState([]);

  useEffect(() => {
    getAllEmployees(initialPageNumber, initialPageSize)
      .then(data => {
        setEmployeesData(data);
      })
      .catch(error => {
        console.log(error);
        toast.error("Error in loading employee details", {
          autoClose: 500, // Set the desired timeout in milliseconds
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });

    getAllDepartments()
      .then(data => {
        setDepartmentsData(data);
      })
      .catch(error => {
        console.error(error);
        // Handle error if necessary
      });

  }, [])

  const deleteEmployeeHandler = (empId) => {
    deleteEmployee(empId)
      .then(() => {
        // Employee deleted successfully
        toast.success("Employee deleted Successfully!!");
        // Fetch the updated list of employees
        getAllEmployees(employeesData.pageNumber, employeesData.pageSize)
          .then(data => {
            setEmployeesData(data);
          })
          .catch(error => {
            toast.error("Error in loading employee details", {
              autoClose: 500, // Set the desired timeout in milliseconds
              position: toast.POSITION.BOTTOM_RIGHT
            });
          });
      })
      .catch((error) => {
        // Error occurred while deleting the employee
        console.error(error);
        // You may want to show an error message or perform any other action
      });
  };
  
  
  

  const updateEmployeeHandler = (empId) => {
    navigate(`/employee/${empId}`);
  }

  const changePage = (pageNumber = initialPageNumber, pageSize = initialPageSize) => {
    if (pageNumber > employeesData.pageNumber && employeesData.lastPage) {
      return;
    }
    if (pageNumber < employeesData.pageNumber && employeesData.pageNumber === 0) {
      return;
    }

    getAllEmployees(pageNumber, pageSize)
      .then(data => {
        setEmployeesData(data);
      })
      .catch(error => {
        toast.error("Error in loading employee details", {
          autoClose: 500, // Set the desired timeout in milliseconds
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  }

  const getDepartmentName = (departmentId) => {
    const department = departmentsData.find((dept) => dept.departmentId === departmentId);
    return department ? department.departmentName : "Unknown";
  };

  return (
    <Container className="mt-3">
      <div className="row">
        {employeesData.employeeData && employeesData.employeeData.map((employee) => (
          <div key={employee.id} className="col-md-4 mb-3">
            <Card>
              <CardHeader tag="h5">{employee.firstName} {employee.lastName}</CardHeader>
              <CardBody>
                <CardText><strong>Email:</strong> {employee.emailId}</CardText>
                <CardText><strong>Department:</strong> {getDepartmentName(employee.departmentId)}</CardText>
                <div className="d-flex justify-content-end">
                  <Button color="info" className="mr-2" onClick={() => updateEmployeeHandler(employee.id)}>Update</Button>
                  <Button color="danger" className="mr-2" onClick={() => deleteEmployeeHandler(employee.id)}>Delete</Button>
                  <Button color="info">View</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Pagination>
          <PaginationItem onClick={() => changePage(0)}>
            <PaginationLink previous>First</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={() => changePage(employeesData.pageNumber - 1)} disabled={employeesData.pageNumber === 0}>
            <PaginationLink previous>Prev</PaginationLink>
          </PaginationItem>
          {[...Array(employeesData.totalPages)].map((item, index) => (
            <PaginationItem onClick={() => changePage(index)} active={index === employeesData.pageNumber} key={index}>
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem onClick={() => changePage(employeesData.pageNumber + 1)} disabled={employeesData.lastPage}>
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={() => changePage(employeesData.totalPages - 1)}>
            <PaginationLink last>Last</PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </Container>
  );
};

export default RightPanelEmployeeList;
