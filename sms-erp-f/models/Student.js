import { uri } from "../gv/global_variables";
export default class Student {
    constructor(id, sl_no, name, fname, mname, sats_no, habitation, aadhar_no, addsm_no, doa, dob, gender, caste, minority, acc_no, ifsc_code, branch, bpl_no, ph_no, bhagya_yojana, fd_no, addsm_rti, class_, prv_class, medium, height, weight, med_advice, place_name) {
      this.id = id;
      this.sl_no = sl_no;
      this.name = name;
      this.fname = fname;
      this.mname = mname;
      this.sats_no = sats_no;
      this.habitation = habitation;
      this.aadhar_no = aadhar_no;
      this.addsm_no = addsm_no;
      this.doa = doa;
      this.dob = dob;
      this.gender = gender;
      this.caste = caste;
      this.minority = minority;
      this.acc_no = acc_no;
      this.ifsc_code = ifsc_code;
      this.branch = branch;
      this.bpl_no = bpl_no;
      this.ph_no = ph_no;
      this.bhagya_yojana = bhagya_yojana;
      this.fd_no = fd_no;
      this.addsm_rti = addsm_rti;
      this.class_ = class_;
      this.prv_class = prv_class;
      this.medium = medium;
      this.height = height;
      this.weight = weight;
      this.med_advice = med_advice;
      this.place_name = place_name;
    }
  
    save() {
      // code to save student object to a database
    }
  
    static findBySlNo(sl_no) {
      // code to find a student object by sl_no from a database and return it
    }
  
    static async findByClass(class_) {
        try {
            console.log("Loki")
          const response = await fetch(`${uri}/students/?class=${class_}`);
          // console.log(response)
          const studentsData = await response.json();
          // console.log(studentsData)
          return studentsData.map((studentData) => new Student(studentData.id, studentData.sl_no, studentData.name, studentData.fname, studentData.mname, studentData.sats_no, studentData.habitation, studentData.aadhar_no, studentData.addsm_no, studentData.doa, studentData.dob, studentData.gender, studentData.caste, studentData.minority, studentData.acc_no, studentData.ifsc_code, studentData.branch, studentData.bpl_no, studentData.ph_no, studentData.bhagya_yojana, studentData.fd_no, studentData.addsm_rti, studentData.class_, studentData.prv_class, studentData.medium, studentData.height, studentData.weight, studentData.med_advice, studentData.place_name));
        } catch (error) {
          console.error(error);
        }
    }
  
    toDict() {
      return {
        'id': this.id,
        'sl_no': this.sl_no,
        'name': this.name,
        'fname': this.fname,
        'mname': this.mname,
        'sats_no': this.sats_no,
        'habitation': this.habitation,
        'aadhar_no': this.aadhar_no,
        'addsm_no': this.addsm_no,
        'doa': this.doa,
        'dob': this.dob,
        'gender': this.gender,
        'caste': this.caste,
        'minority': this.minority,
        'acc_no': this.acc_no,
        'ifsc_code': this.ifsc_code,
        'branch': this.branch,
        'bpl_no': this.bpl_no,
        'ph_no': this.ph_no,
        'bhagya_yojana': this.bhagya_yojana,
        'fd_no': this.fd_no,
        'addsm_rti': this.addsm_rti,
        'class_': this.class_,
        'prv_class': this.prv_class,
        'medium': this.medium,
        'height': this.height,
        'weight': this.weight,
        'med_advice': this.med_advice,
        'place_name': this.place_name
      };
    }
  }
  