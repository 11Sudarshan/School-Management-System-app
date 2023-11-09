from flask import Blueprint, jsonify, request
from models.teacher import Teacher
from flask_bcrypt import Bcrypt

# Define the Flask blueprint
bp = Blueprint('teachers', __name__)

bcrypt = Bcrypt()

@bp.route('/', methods=['POST'])
def create_teacher():
    data = request.get_json()
    teacher = Teacher(**data)
    teacher.save()
    return {'msg': 'Sucessfully added teacher'}, 201

@bp.route('/<teacher_id>', methods=['GET'])
def get_teacher_by_id(teacher_id):
    teacher = Teacher.get_by_id(teacher_id)
    if not teacher:
        return jsonify({'error': 'Teacher not found'}), 404
    return jsonify(teacher.to_dict()), 200
@bp.route('/<teacher_id>/subjects_handling', methods=['GET', 'PUT', 'DELETE'])
def subjects_handling(teacher_id):
    # Get the teacher instance from the database
    teacher = Teacher.get_by_id(teacher_id)
    
    if not teacher:
        return jsonify({'error': 'Teacher not found'}), 404
    
    if request.method == 'GET':
        # Get the current subjects handling list for the teacher
        subjects = teacher.get_subjects_handling()
        if not subjects:
            return jsonify({"msg" : "No subjects are handled by this teacher"}),200
        return jsonify(subjects), 200
    
    elif request.method == 'PUT':
        # Update the subjects handling list for the teacher
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
        try:
            subjects = data['subjects']
        except KeyError:
            return jsonify({'error': 'Missing subjects key in JSON data'}), 400
        teacher.update_subjects_handling(subjects)
        return jsonify({'success': 'Subjects handling list updated'}), 200
    
    elif request.method == 'DELETE':
        # Remove a subject from the subjects handling list for the teacher
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
        try:
            subject = data['subject']
        except KeyError:
            return jsonify({'error': 'Missing subject key in JSON data'}), 400
        teacher.remove_subject(subject)
        return jsonify({'success': 'Subject removed from subjects handling list'}), 200
    

@bp.route('/<teacher_id>/class_teacher_of', methods=['GET', 'PUT', 'DELETE'])
def class_teacher_of(teacher_id):
    # Get the teacher instance from the database
    teacher = Teacher.get_by_id(teacher_id)
    
    if not teacher:
        return jsonify({'error': 'Teacher not found'}), 404
    
    if request.method == 'GET':
        # Get the current class teacher of list for the teacher
        classes = teacher.get_class_teacher_of()
        return jsonify(classes), 200
    
    elif request.method == 'PUT':
        # Update the class teacher of list for the teacher
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
        try:
            classes = data['classes']
        except KeyError:
            return jsonify({'error': 'Missing classes key in JSON data'}), 400
        teacher.update_class_teacher_of(classes)
        return jsonify({'success': 'Class teacher of list updated'}), 200
    
    elif request.method == 'DELETE':
        # Remove a class from the class teacher of list for the teacher
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
        try:
            class_ = data['class']
        except KeyError:
            return jsonify({'error': 'Missing class key in JSON data'}), 400
        teacher.remove_class(class_)
        return jsonify({'success': 'Class removed from class teacher of list'}), 200


@bp.route('/authenticate', methods=['POST'])
def authenticate_teacher():
    data = request.get_json()
    teacher_id = data.get('teacher_id')
    password = data.get('password')
    if not teacher_id or not password:
        return jsonify({'error': 'Missing teacher_id or password'}), 400
    
    teacher = Teacher.get_by_id(teacher_id)
    if not teacher:
        return jsonify({'error': 'Teacher not found'}), 404
    if teacher.password==password:
        return jsonify(teacher.to_dict()), 200
    else:
        return jsonify({'error': 'Incorrect password'}), 401
