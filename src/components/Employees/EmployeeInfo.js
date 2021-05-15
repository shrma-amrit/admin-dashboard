import React from 'react';

import Card from '../UI/Card';
import Date from '../UI/Date';
import styles from './EmployeeInfo.module.css';

const EmployeeInfo = (props) => {
  return (
    <li>
      <Card className={styles['employee-info']}>
        <Date date={props.date} />
        <div className={styles['employee-info__details']}>
          <h2>{props.name}</h2>
          <h2>{props.phone}</h2>
          <h2>{props.email}</h2>
          <div className={styles['employee-info__salary']}>${props.salary}</div>
        </div>
      </Card>
    </li>
  );
};

export default EmployeeInfo;
