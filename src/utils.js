import { Constants } from './Constants';
const axios = require('axios');

export const getAllEmployees = async () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: Constants.BASE_URL + Constants.GET_ALL_EMPLOYEES,
    }).then(function (response) {
      return resolve(response.data);
    }).catch(err => {
      return reject(err);
    });
  })
}

export const getEmployeeById = async ({ id }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: Constants.BASE_URL + Constants.GET_EMPLOYEE + id,
    }).then(function (response) {
      return resolve(response.data);
    }).catch(err => {
      return reject(err);
    });
  })
}

export const addEmployee = async ({ name, department, phone, email, salary }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: Constants.BASE_URL + Constants.CREATE_EMPLOYEE,
      data: {
        name,
        department,
        phone,
        email,
        salary
      }
    }).then(function (response) {
      return resolve(response.data);
    }).catch(err => {
      return reject(err);
    });
  })
}

export const editEmployee = async ({ id, name, department, phone, email, salary }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'patch',
      url: Constants.BASE_URL + Constants.GET_EMPLOYEE + id,
      data: {
        name,
        department,
        phone,
        email,
        salary
      }
    }).then(function (response) {
      return resolve(response.data);
    }).catch(err => {
      return reject(err);
    });
  })
}

export const deleteEmployee = async ({ id }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: Constants.BASE_URL + Constants.GET_EMPLOYEE + id,
    }).then(function (response) {
      return resolve(response.data);
    }).catch(err => {
      return reject(err);
    });
  })
}