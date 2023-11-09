import axios from 'axios';

// Find student by SL number
export const findStudentBySLNo = async (slNo) => {
  try {
    const response = await axios.get(`http://your-api-url/students/${slNo}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Find students by class
export const findStudentsByClass = async (class_) => {
  try {
    const response = await axios.get('http://your-api-url/students/', {
      params: {
        class: class_
      }
    });
    return response.data.map(student => ({
      sl_no: student.sl_no,
      name: student.name,
      // Other student fields...
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Create student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post('http://your-api-url/students/', studentData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Call the functions
const exampleFunction = async () => {
  // Find student by SL number
  const student = await findStudentBySLNo(1234);
  console.log(student);

  // Find students by class
  const students = await findStudentsByClass('10A');
  console.log(students);

  // Create student
  const newStudent = await createStudent({
    sl_no: 5678,
    name: 'John Doe',
    // Other student fields...
  });
  console.log(newStudent);
};


console.log("Hello")