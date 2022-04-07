import "./styles.css";
import { useState } from "react";

const columns = [
  { col_label: "Employee Id", col_name: "emp_id" },
  { col_label: "Employee Name", col_name: "emp_name" },
  { col_label: "Employee Email", col_name: "emp_email" },
  { col_label: "Employee Contact", col_name: "emp_cont" }
];
const employees = [
  {
    emp_id: 1,
    emp_name: "Santhose",
    emp_email: "server@unraveldata.com",
    emp_cont: 999999
  },
  {
    emp_id: 2,
    emp_name: "Kumar",
    emp_email: "kumar@unraveldata.com",
    emp_cont: 888888
  },
  {
    emp_id: 3,
    emp_name: "Malay M",
    emp_email: "malay2@unraveldata.com",
    emp_cont: 777777
  }
];

function DrawRow(props) {
  const { columns, employeeRec } = props;
  return (
    <tr className="my-border">
      {Object.keys(columns).map((key, index) => {
        const { col_name } = columns[key];
        return (
          <td className="u-cell-layout" key={`${col_name}-${index}`}>
            {employeeRec[col_name]}
          </td>
        );
      })}
    </tr>
  );
}

function DrawTable(props) {
  const { employees, columns } = props;
  const [orderedEmp, setOrderedEmp] = useState(employees);
  const [orderedKey, setOrderedKey] = useState({});

  const sortThis = (e, col_name) => {
    const assDes = orderedKey[col_name] ? !orderedKey[col_name] : true;
    const newObj = {};
    newObj[col_name] = assDes;

    const newKeys = { ...orderedKey, ...newObj };
    setOrderedKey(newKeys);

    const sortedEmp = orderedEmp.sort((a, b) => {
      if (assDes) {
        if (a[col_name] >= b[col_name]) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a[col_name] <= b[col_name]) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    setOrderedEmp(sortedEmp);
  };

  return (
    <table className="u-table">
      <tr className="my-border">
        {Object.keys(columns).map((key) => {
          const { col_label, col_name } = columns[key];
          return (
            <th
              className="u-header u-cell-layout"
              key={`${col_label}`}
              onClick={(e) => sortThis(e, col_name)}
            >
              {col_label}
            </th>
          );
        })}
      </tr>
      {orderedEmp.length &&
        orderedEmp.map((rec) => (
          <DrawRow columns={columns} employeeRec={rec} />
        ))}
    </table>
  );
}
export default function App() {
  return (
    <div className="App">
      <DrawTable columns={columns} employees={employees} />
    </div>
  );
}
