from flask import Blueprint, jsonify, request
from models.marks import Marks

# Define the Flask blueprint
bp = Blueprint('marks', __name__)

# Define the HTTP endpoint for inserting marks
@bp.route('/', methods=['POST'])
def insert_marks():
    data = request.get_json()
    class_ = data.get('class_')
    test_id = data.get('test_id')
    subject_id = data.get('subject_id')
    student_marks = data.get('student_marks')
    if class_ and test_id and subject_id and student_marks:
        Marks.insert(class_, test_id, subject_id, student_marks)
        return jsonify({'success': True}), 201
    else:
        return jsonify({'error': 'Missing required fields'}), 400

# Define the HTTP endpoint for finding marks by class
@bp.route('/', methods=['GET'])
def find_marks_by_class():
    class_ = request.args.get('class')
    if class_:
        marks_list = Marks.find_by_class(class_)
        return jsonify(marks_list), 200
    else:
        return jsonify({'error': 'Class not specified'}), 400

# Define the HTTP endpoint for updating marks by class, test ID, and subject ID
@bp.route('/', methods=['PUT'])
def update_marks():
    data = request.get_json()
    class_ = data.get('class_')
    test_id = data.get('test_id')
    print(test_id)
    subject_id = data.get('subject_id')
    student_marks = data.get('student_marks')
    if class_ and test_id and subject_id and student_marks:
        result = Marks.update_marks(class_, test_id, subject_id, student_marks)
        if result:
            return jsonify({'success': True}), 200
        else:
             Marks.insert(class_, test_id, subject_id, student_marks)
             return jsonify({'success': True}), 201
    else:
        return jsonify({'error': 'Missing required fields'}), 400
