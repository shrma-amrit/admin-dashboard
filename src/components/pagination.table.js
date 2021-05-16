import React, { useEffect, useState } from "react";

import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllEmployees, getEmployeeById, deleteEmployee, editEmployee, addEmployee } from '../utils';
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        className="form-control"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  )
}


const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            <table className="table" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}

                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Col>
          <Col xs={12} md={12} lg={12}>
            <ul className="pagination">
              <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <a className="page-link">First</a>
              </li>
              <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <a className="page-link">{'<'}</a>
              </li>
              <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                <a className="page-link">{'>'}</a>
              </li>
              <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <a className="page-link">Last</a>
              </li>
              <li>
                <a className="page-link">
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </a>
              </li>

              <select
                className="form-control"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
                style={{ width: '120px', height: '38px' }}
              >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </ul>
          </Col>
        </Row>
      </Container>
    </div >
  )
}

const PaginationTableComponent = () => {

  const [showModal, setShowModal] = useState(false);
  const [enteredName, setEnteredName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [formType, setFormType] = useState('add');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [allEmployeesData, setAllEmployeesData] = useState([]);

  const titleChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredSalary(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const departmentChangeHandler = (event) => {
    setSelectedDepartment(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessages([]);
    if (enteredName === undefined || enteredName.trim().length === 0) {
      updateErrorMessages('Name is required.');
    }
    if (enteredEmail === undefined || enteredEmail.trim().length === 0) {
      updateErrorMessages('Email is required.');
    }
    if (enteredPhone === undefined || enteredPhone.trim().length === 0) {
      updateErrorMessages('Phone is required.');
    }
    if (selectedDepartment === undefined || selectedDepartment.trim().length === 0) {
      updateErrorMessages('Department is required.');
    }
    if (enteredSalary === undefined || enteredSalary === 0) {
      updateErrorMessages('Salary is required.');
    }

    if (enteredName === undefined || enteredName.trim().length === 0 ||
      enteredEmail === undefined || enteredEmail.trim().length === 0 ||
      enteredPhone === undefined || enteredPhone.trim().length === 0 ||
      selectedDepartment === undefined || selectedDepartment.trim().length === 0 ||
      enteredSalary === undefined || enteredSalary === 0
    ) {
      return false;
    }

    const employeeData = {
      name: enteredName,
      salary: enteredSalary,
      phone: enteredPhone,
      email: enteredEmail,
      date: new Date(),
      department: selectedDepartment
    };

    if (formType === 'add') {
      await addEmployee(employeeData);
      await getAllEmployeeDataHandler();
    } else { //edit form functionality
      await editEmployee({ id: selectedEmployee , ...employeeData })
    }

    setShowModal(false);

    // props.onSaveEmployeeData(employeeData);
    emptyForm();
  };

  const emptyForm = () => {
    setEnteredName('');
    setEnteredSalary('');
    setEnteredPhone('');
    setEnteredEmail('');
    setSelectedDepartment('');
    setSelectedEmployee('');
  }

  const updateErrorMessages = (message) => {
    setErrorMessages(prevState => {
      return [...prevState, message]
    });
  }

  const editFormHandler = async (empId) => {
    const employee = await getEmployeeById({id: empId})
    setFormType('edit');
    setSelectedEmployee(employee.id);
    setShowModal(true);

    // one employee data fetch API call

    // Change states as per the response
    setEnteredName(employee.name);
    setEnteredSalary(employee.salary);
    setEnteredPhone(employee.phone);
    setEnteredEmail(employee.email);
    setSelectedDepartment(employee.department);
  }

  const deleteFormHandler = async (empId) => {
    // delete API call
    await deleteEmployee({ id: empId })
    await getAllEmployeeDataHandler();
  }

  const getAllEmployeeDataHandler = async () => {
    // run API to fetch all employees
    const response = await getAllEmployees();
    setAllEmployeesData(response);
  }

  useEffect(() => {
    getAllEmployeeDataHandler();
  }, [selectedEmployee]);

  const departments = [
    '',
    'Finance',
    'Operations',
    'Engineering',
    'Human Resource',
    'Quality Assurance',
    'Technical Support',
    'Talent Acquisition'
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employees Information',
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Email',
            accessor: 'email',
            disableGlobalFilter: true
          },
          {
            Header: 'Department',
            accessor: 'department',
          },
          {
            Header: 'Salary',
            accessor: 'salary',
            disableGlobalFilter: true
          },
          {
            Header: 'Actions',
            accessor: 'actions',
            disableGlobalFilter: true,
            disableSorting: true,
            Cell: ({ row: { original } }) => {
              return (
                <>
                  <Button
                    variant="primary"
                    onClick={() => editFormHandler(original.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    style={{ marginLeft: '10px' }}
                    onClick={() => deleteFormHandler(original.id)}
                  >Delete</Button>
                </>
              )
            },
            getProps: () => ({ someFunc: () => alert("clicked") })
          }
        ],
      }
    ],
    []
  )

  const data = [
    {
      "name": "AMD",
      "phone": "9980242342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Am S",
      "phone": "9980242342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Abh P",
      "phone": "9980242342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Ani K",
      "phone": "9980242992",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Ank R",
      "phone": "9980266342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Ayu D",
      "phone": "9980242342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
    {
      "name": "Ski C",
      "phone": "9980242342",
      "email": "a@a.com",
      "department": "",
      "salary": 1000,
      "status": "Active"
    },
  ]

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <Button
              variant="primary"
              style={{ float: "right" }}
              onClick={() => {
                emptyForm();
                setShowModal(true);
              }}
            >
              Add Employee
              </Button>
          </Col>
          <Col xs={12} md={12} lg={12}>
            {allEmployeesData && allEmployeesData.length ? <Table columns={columns} data={allEmployeesData} /> : ''}
          </Col>
        </Row>
      </Container>
      {
        showModal ?
          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
            <form>
              <Modal.Header closeButton>
                <Modal.Title>Employee Details Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group>
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                          type='text'
                          value={enteredName || ''}
                          onChange={titleChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group>
                        <Form.Label>Phone*</Form.Label>
                        <Form.Control
                          type='text'
                          value={enteredPhone || ''}
                          onChange={phoneChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group>
                        <Form.Label>Email*</Form.Label>
                        <Form.Control
                          type='email'
                          value={enteredEmail || ''}
                          onChange={emailChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group>
                        <Form.Label>Department*</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedDepartment || ''}
                          onChange={departmentChangeHandler}
                        >
                          {
                            departments.map(department => {
                              return (
                                <option
                                  value={department}
                                  key={department}
                                >
                                  {department}
                                </option>
                              )
                            })
                          }
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group>
                        <Form.Label>Salary*</Form.Label>
                        <Form.Control
                          type='number'
                          type='number'
                          min='1000'
                          step='1000'
                          value={enteredSalary || ''}
                          onChange={amountChangeHandler}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>

                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={submitHandler}>
                  Save Changes
                  </Button>
              </Modal.Footer>
            </form>
          </Modal>
          : ''
      }
    </>
  )
}

export default PaginationTableComponent;