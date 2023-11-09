import { uri } from "../gv/global_variables";
export default class AttendanceModel{
    constructor(class_,date,attendance){
        this.class_=class_;
        this.date=date;
        this.attendance=attendance;
    }

    static async findByClass(class_){
        const response =  await fetch(`${uri}/attendance/?class=${class_}`);
        const data = await response.json();
        console.log(data)
        let attendance_list = [];
        for (const item of data){
            console.log(item.class,item.date,item.attendace)
            const attendanceDict = Object.entries(item.attendance).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
              }, {});
      
              const attendance = new AttendanceModel(item.class, item.date, attendanceDict);
              attendance_list.push(attendance);
        }
        console.log("attend list is")
        console.log(attendance_list)
        return attendance_list;
    }
}