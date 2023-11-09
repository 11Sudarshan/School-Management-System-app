
import { uri } from "../gv/global_variables";
export default class Tests {
  constructor(name, class_, subjects) {
    this.name = name;
    this.class_ = class_;
    this.subjects = subjects;
  }

 



  static async find_by_class(class_) {
    const response = await fetch(`${uri}/tests/?class=${class_}`);
    const tests_list = await response.json();

    const tests = tests_list.map(test_dict => {
    const subjects = test_dict.subjects.map(subject_dict => new Subject(subject_dict));
    return new Tests(test_dict.name, test_dict.class, subjects);
  });
  console.log(tests);
  return tests;
  }
}

class Subject {
  constructor(id, name, max_marks, passing_marks, grade_type) {
    this.id = id;
    this.name = name;
    this.max_marks = max_marks;
    this.passing_marks = passing_marks;
    this.grade_type = grade_type;
  }
}
