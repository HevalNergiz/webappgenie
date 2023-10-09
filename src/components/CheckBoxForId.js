// import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
// import CustomCheckbox from "./CustomCheckbox";

// const CustomCheckboxWithId = ({
//   componentId,
//   id,
//   name,
//   whatisthis,
//   children,
// }) => {
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const storedValue = localStorage.getItem(id);
//     if (storedValue !== null) {
//       setChecked(storedValue === "true");
//     }
//   }, [id]);

//   const handleCheckboxChange = (event) => {
//     const isChecked = event.target.checked;
//     setChecked(isChecked);
//     localStorage.setItem(id, isChecked);
//   };

//   const checkboxId = `${componentId}-${id}`;

//   return (
//     <CustomCheckbox
//       id={checkboxId}
//       name={name}
//       whatisthis={whatisthis}
//       checked={checked}
//       onChange={handleCheckboxChange}
//     >
//       {children}
//     </CustomCheckbox>
//   );
// };

// export default CustomCheckboxWithId;
