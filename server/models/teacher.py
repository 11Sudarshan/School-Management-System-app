
from pymongo import MongoClient
uri = f'mongodb+srv://kiafbial123:kiafbial123@cluster0.o3lbxfj.mongodb.net/?retryWrites=true&w=majority'


client = MongoClient(uri)
db = client['ghps_aradeshanahalli']
teachers = db['teachers']
class Teacher:
    def __init__(self, teacher_id, name, password,class_teacher_of):
        self.teacher_id = teacher_id
        self.name = name
        self.class_teacher_of = class_teacher_of
        self.password = password
        
   
    
    def to_dict(self):
        return { 
            'teacher_id': self.teacher_id,
            'name': self.name,
            'class_teacher_of': self.class_teacher_of,
        }
    def save(self):
        teachers.insert_one(self.__dict__)

    @classmethod
    def get_by_id(cls, teacher_id):
        doc = teachers.find_one({'teacher_id': teacher_id},{"_id" : 0})
        if not doc:
            return None
        teacher = cls(**doc)
        return teacher