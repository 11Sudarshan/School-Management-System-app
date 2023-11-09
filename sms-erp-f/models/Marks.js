import { uri } from "../gv/global_variables";
export default class MarksModel{
    constructor(class_, test_id, subject_id, student_marks) {
      this.class_ = class_;
      this.test_id = test_id;
      this.subject_id = subject_id;
      this.student_marks = student_marks;
    }
  
    static async findByClass(class_) {
      const response = await fetch(`${uri}/marks?class=${class_}`);
      const data = await response.json();
      let marksList = [];
      for (const item of data) {
        const marks = new MarksModel(item.class, item.test_id, item.subject_id,item.student_marks);
        marksList.push(marks);
      }
      return marksList;
    }
  }
  