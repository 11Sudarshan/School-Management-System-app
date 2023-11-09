from pymongo import MongoClient
uri = f'mongodb+srv://kiafbial123:kiafbial123@cluster0.o3lbxfj.mongodb.net/?retryWrites=true&w=majority'


client = MongoClient(uri)
db = client['ghps_aradeshanahalli']
students = db['students']

class Student:
    def __init__(self,sl_no, name, fname, mname, sats_no, habitation, aadhar_no, addsm_no, doa, dob, gender, caste, minority, acc_no, ifsc_code, branch, bpl_no, ph_no, bhagya_yojana, fd_no, addsm_rti, class_, prv_class, medium, height, weight, med_advice,place_name):
        self.sl_no = sl_no
        self.name = name
        self.fname = fname
        self.mname = mname
        self.sats_no = sats_no
        self.habitation = habitation
        self.aadhar_no = aadhar_no
        self.addsm_no = addsm_no
        self.doa = doa
        self.dob = dob
        self.gender = gender
        self.caste = caste
        self.minority = minority
        self.acc_no = acc_no
        self.ifsc_code = ifsc_code
        self.branch = branch
        self.bpl_no = bpl_no
        self.ph_no = ph_no
        self.bhagya_yojana = bhagya_yojana
        self.fd_no = fd_no
        self.addsm_rti = addsm_rti
        self.class_ = class_
        self.prv_class = prv_class
        self.medium = medium
        self.height = height
        self.weight = weight
        self.med_advice = med_advice
        self.place_name =place_name

    def save(self):
        students.insert_one(self.__dict__)

    @staticmethod
    def find_by_sl_no(sl_no):
        sl_no=str(sl_no)
        x= students.find_one({'sl_no': sl_no})
        print(x)
        
        return x

    @staticmethod
    def find_by_class(class_):
        students_cursor = students.find({'class_': class_},{"_id":0})
        return students_cursor


        

    def to_dict(self):
        return {
            'sl_no': self.sl_no,
            'name': self.name,
            'fname': self.fname,
            'mname': self.mname,
            'sats_no': self.sats_no,
            'habitation': self.habitation,
            'aadhar_no': self.aadhar_no,
            'addsm_no': self.addsm_no,
            'doa': self.doa,
            'dob': self.dob,
            'gender': self.gender,
            'caste': self.caste,
            'minority': self.minority,
            'acc_no': self.acc_no,
            'ifsc_code': self.ifsc_code,
            'branch': self.branch,
            'bpl_no': self.bpl_no,
            'ph_no': self.ph_no,
            'bhagya_yojana': self.bhagya_yojana,
            'fd_no': self.fd_no,
            'addsm_rti': self.addsm_rti,
            'class_': self.class_,
            'prv_class': self.prv_class,
            'medium': self.medium,
            'height': self.height,
            'weight': self.weight,
            'med_advice': self.med_advice,
            'place_name' : self.place_name
        }

  
