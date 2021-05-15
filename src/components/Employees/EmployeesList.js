import React from 'react';

import EmployeeInfo from './EmployeeInfo';
import styles from './EmployeesList.module.css';

const EmployeesList = (props) => {
  if (props.employees.length === 0) {
    return <h2 className={styles['employees-list__fallback']}>Found no employees.</h2>;
  }

  return (
    <ul className={styles['employees-list']}>
      {props.employees.map((employee) => (
        <EmployeeInfo
          key={employee.id}
          name={employee.name}
          salary={employee.salary}
          phone={employee.phone}
          email={employee.email}
          date={employee.date}
        />
      ))}
    </ul>
  );
};

export default EmployeesList;
