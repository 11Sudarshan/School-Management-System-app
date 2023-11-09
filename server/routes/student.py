from flask import Blueprint, jsonify, request
from models.student import Student

# Define the Flask blueprint
bp = Blueprint('students', __name__)

# Define the HTTP endpoints for finding students by SL number and class
@bp.route('/<int:sl_no>')
def find_student_by_sl_no(sl_no):
    print(sl_no)
    student = Student.find_by_sl_no(sl_no)
    if student:
        student_obj = Student(**student)
        student_dict= student_obj.to_dict()
        return jsonify(student_dict), 200
    else:
        return jsonify({'error': 'Student not found'}), 404

@bp.route('/')
def find_students_by_class():
    class_ = request.args.get('class')
    print(class_)
    if class_:
        class_students = Student.find_by_class(class_)
        if not class_students:
            return jsonify({'message': 'No students found for the specified class'}), 404
        student_objects = [Student(**student) for student in class_students]
        student_dicts = [student.to_dict() for student in student_objects]
        temp = jsonify(student_dicts)
        return temp, 200
    else:
        return jsonify({'error': 'Class not specified'}), 400


@bp.route('/', methods=['POST'])
def create_student():
    data = request.get_json()
    student = Student(**data)
    student.save()
    return 'suces', 201
