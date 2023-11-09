import { uri } from "../gv/global_variables";
export default class Teacher {
    constructor(teacher_id,name,class_teacher_of) {
     this.teacher_id =teacher_id;
     this.name = name;
     this.class_teacher_of = class_teacher_of;
    }
  
   
  
    static async authenticate(teacher_id , password) {
        try {
          console.log("Login started")
            const response = await fetch(`${uri}/teachers/authenticate`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacher_id: teacher_id, password : password})
         });
         if (response.status === 200) {
            const data = await response.json();
            const { teacher_id, name, class_teacher_of } = data;
            console.log(teacher_id)
            console.log(name)
            console.log(class_teacher_of)
            return new Teacher(teacher_id, name, class_teacher_of);
          } 
          else if(response.status = 400){
            throw new Error('Missing id or password');
          }
          else if (response.status === 404) {
            throw new Error('Teacher not found');
          } else if (response.status === 401) {
            throw new Error('Incorrect password');
          } else {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
    } 
      catch (error) {
        //   console.error(error);
          throw error;
        }
    }
  
  }
  