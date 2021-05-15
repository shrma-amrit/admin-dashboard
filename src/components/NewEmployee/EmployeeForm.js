import React, { useState } from 'react';

import styles from './EmployeeForm.module.css';

const EmployeeForm = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredSalary, setEnteredSalary] = useState('');

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

  const submitHandler = (event) => {
    event.preventDefault();

    const employeeData = {
      name: enteredName,
      salary: enteredSalary,
      phone: enteredPhone,
      email: enteredEmail,
      date: new Date()
    };

    props.onSaveEmployeeData(employeeData);
    setEnteredName('');
    setEnteredSalary('');
    setEnteredPhone('');
    setEnteredEmail('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['new-employee__controls']}>
        <div className={styles['new-employee__control']}>
          <label>Name</label>
          <input
            type='text'
            value={enteredName}
            onChange={titleChangeHandler}
          />
        </div>
        <div className={styles['new-employee__control']}>
          <label>Salary</label>
          <input
            type='number'
            min='1000'
            step='1000'
            value={enteredSalary}
            onChange={amountChangeHandler}
          />
        </div>
        <div className={styles['new-employee__control']}>
          <label>Phone</label>
          <input
            type='text'
            value={enteredPhone}
            onChange={phoneChangeHandler}
          />
        </div>
        <div className={styles['new-employee__control']}>
          <label>Email</label>
          <input
            type='text'
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
      </div>
      <div className={styles['new-employee__actions']}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Employee</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
