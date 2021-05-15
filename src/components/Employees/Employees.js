import React from 'react';

import Card from '../UI/Card';
import EmployeesList from './EmployeesList';
import styles from './Employees.module.css';

const Employees = (props) => {
  return (
    <div>
      <Card className={styles.employees}>
        <EmployeesList employees={props.employees} />
      </Card>
    </div>
  );
};

export default Employees;
