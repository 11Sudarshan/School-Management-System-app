from pymongo import MongoClient

client = MongoClient('mongodb+srv://kiafbial123:kiafbial123@cluster0.o3lbxfj.mongodb.net/?retryWrites=true&w=majority')
db = client["ghps_aradeshanahalli"]
tests = db["tests"]

class Test:
    def __init__(self,name, class_, subjects):
        self.name = name
        self.class_ = class_
        self.subjects = subjects
        
    def to_dict(self):
        return {
            "name": self.name,
            "class": self.class_,
            "subjects": [subject.__dict__ for subject in self.subjects]
        }
    
    @classmethod
    def insert(cls, test):
        test_dict = test.to_dict()
        result = tests.insert_one(test_dict)
        return result.inserted_id
    
    @classmethod
    def find_by_id(cls, id):
        test_dict = tests.find_one({"_id": id})
        if test_dict:
            subjects = [Subject(**subject_dict) for subject_dict in test_dict["subjects"]]
            return cls(id=test_dict["_id"], name=test_dict["name"], class_=test_dict["class"], subjects=subjects)
        else:
            return None
    
    @classmethod
    def find_by_class(cls, class_):
        test_dicts = tests.find({"class": class_})
        tests_list = []
        for test_dict in test_dicts:
            subjects = [Subject(**subject_dict) for subject_dict in test_dict["subjects"]]
            test = cls( name=test_dict["name"], class_=test_dict["class"], subjects=subjects)
            tests_list.append(test)
        return tests_list


class Subject:
    def __init__(self, id, name, max_marks, passing_marks, grade_type):
        self.id = id
        self.name = name
        self.max_marks = max_marks
        self.passing_marks = passing_marks
        self.grade_type = grade_type