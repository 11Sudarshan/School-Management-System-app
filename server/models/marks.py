from pymongo import MongoClient
uri = f'mongodb+srv://kiafbial123:kiafbial123@cluster0.o3lbxfj.mongodb.net/?retryWrites=true&w=majority'

from datetime import datetime
client = MongoClient(uri)
db = client['ghps_aradeshanahalli']
marks = db['marks']


class Marks:
    def __init__(self, class_, test_id, subject_id, student_marks,time=None):
        self.class_ = class_
        self.test_id = test_id
        self.subject_id = subject_id
        self.student_marks = student_marks,
        self.time = time or []


    @classmethod
    def insert(cls, class_, test_id, subject_id, student_marks):
        marks.insert_one({
            "class": class_,
            "test_id": test_id,
            "subject_id": subject_id,
            "student_marks": student_marks,
            "time": [datetime.now()]
        })

    @classmethod
    def find_by_class(cls, class_):
        
        marks_list = list(marks.find({"class": class_}, {"_id": 0}))
        return marks_list
    
    @classmethod
    def update_marks(cls, class_, test_id, subject_id, student_marks):
        doc = marks.find_one({"class": class_, "test_id": test_id, "subject_id": subject_id})
        if doc:
            marks.update_one(
                {"class": class_, "test_id": test_id, "subject_id": subject_id},
                {"$set": {"student_marks": student_marks},
                 "$push": {"time": datetime.now()}}
            )
            return True
        else:
            return False
