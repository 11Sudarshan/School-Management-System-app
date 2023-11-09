from flask import Blueprint, jsonify, request
from models.test import Test , Subject

# Define the Flask blueprint
bp = Blueprint('tests', __name__)

# # Define the HTTP endpoints for finding tests by ID and class
# @bp.route('/<string:id>')
# def find_test_by_id(id):
#     test = Test.find_by_id(id)
#     if test:
#         return jsonify(test.to_dict()), 200
#     else:
#         return jsonify({'error': 'Test not found'}), 404

@bp.route('/')
def find_tests_by_class():
    class_ = request.args.get('class')
    if class_:
        tests = Test.find_by_class(class_)
        test_dicts = [test.to_dict() for test in tests]
        return jsonify(test_dicts), 200
    else:
        return jsonify({'error': 'Class not specified'}), 400

@bp.route('/', methods=['POST'])
def create_test():
    data = request.get_json()
    subjects = [Subject(**subject_dict) for subject_dict in data["subjects"]]
    test = Test( name=data["name"], class_=data["class"], subjects=subjects)
    Test.insert(test)
    return 'success', 201
