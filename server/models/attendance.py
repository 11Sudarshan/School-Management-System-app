from pymongo import MongoClient
uri = f'mongodb+srv://kiafbial123:kiafbial123@cluster0.o3lbxfj.mongodb.net/?retryWrites=true&w=majority'


from datetime import datetime
client = MongoClient(uri)
db = client['ghps_aradeshanahalli']
attendancedb= db['attendance']

class Attendance:
    def __init(self,class_,date,attendance,time):
        self.class_ =class_
        self.date =date
        self.attendance =attendance
        self.time = time or []
    
    @classmethod
    def insert(cls,class_,date,attendance):
        attendancedb.insert_one({
            "class": class_,
            "date":date,
            "attendance": attendance,
            "time": [datetime.now()]
        })
    
    @classmethod
    def find_by_class(cls,class_):
        attendance_list = list(attendancedb.find({"class":class_},{"_id":0}))
        return attendance_list
    
    @classmethod
    def update_attendance(cls,class_,date,attendance):
        doc= attendancedb.find_one({"class":class_,"date":date})
        if doc:
            attendancedb.update_one(
                {
                "class":class_ ,"date":date
                },
                {
                "$set": {
                "attendance" : attendance
                },
                "$push":{"time" : datetime.now()}
                }
            )
            return True
        else:
            return False