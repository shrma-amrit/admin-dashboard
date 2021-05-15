import React, { useState } from 'react';

import NewEmployee from './components/NewEmployee/NewEmployee';
import Employees from './components/Employees/Employees';

const App = () => {
  const [employees, setEmployees] = useState([]);

  const addEmployeeHandler = (employee) => {
    debugger;
    setEmployees((prevEmployees) => {
      return [employee, ...prevEmployees];
    });
  };

  return (
    <div>
      <NewEmployee onAddEmployee={addEmployeeHandler} />
      <Employees employees={employees} />
    </div>
  );
};

export default App;
