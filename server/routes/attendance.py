from flask import Blueprint, jsonify, request
from models.attendance import Attendance

# Define the Flask blueprint
bp = Blueprint('attendance', __name__)

@bp.route('/',methods=['POST'])
def insert_attendance():
    data=request.get_json()
    class_ = data.get('class_')
    date = data.get('date')
    attendance= data.get('attendance')
    if class_ and date and attendance:
        Attendance.insert(class_,date,attendance)
        return jsonify({'success': True}), 200
    else:
        return jsonify({'error': 'Missing required fields'}) , 400
       
@bp.route('/',methods=["GET"])
def find_attendance_by_class():
    class_ = request.args.get('class')
    print(class_)
    if class_:
        attendance_list = Attendance.find_by_class(class_)
        return jsonify(attendance_list),200
    else:
        return jsonify({'error': 'Class not specified'}), 400
    
@bp.route('/',methods=["PUT"])
def update_attendance():
    data=request.get_json()
    print(data)
    class_ = data.get("class_")
    date = data.get("date")
    attendance = data.get("attendance")
    if class_ and date:
        result = Attendance.update_attendance(class_,date,attendance)
        if result:
            return jsonify({'success': True}), 200
        else:
            Attendance.insert(class_,date,attendance)
            return jsonify({'success': True}), 201
    else:
        return jsonify({'error': 'Missing required fields'}), 400
