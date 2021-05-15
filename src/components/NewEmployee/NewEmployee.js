import React, { useState } from 'react';

import EmployeeForm from './EmployeeForm';
import styles from './NewEmployee.module.css';

const NewEmployee = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveEmployeeDataHandler = (enteredEmployeeData) => {
    const employeeData = {
      ...enteredEmployeeData,
      id: Math.random().toString(),
    };
    props.onAddEmployee(employeeData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles['new-employee']}>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Employee</button>
      )}
      {isEditing && (
        <EmployeeForm
          onSaveEmployeeData={saveEmployeeDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewEmployee;
