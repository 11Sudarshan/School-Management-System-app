from flask import Flask
from routes.student import bp as students_bp
from routes.teacher import bp as teacher_bp
from routes.test import bp as test_bp
from routes.marks import bp as marks_bp
from routes.attendance import bp as attendance_bp
# Define the Flask app and register the blueprint
app = Flask(__name__)
app.register_blueprint(students_bp, url_prefix='/students')
app.register_blueprint(teacher_bp, url_prefix='/teachers')
app.register_blueprint(marks_bp, url_prefix='/marks')
app.register_blueprint(test_bp, url_prefix='/tests')
app.register_blueprint(attendance_bp, url_prefix='/attendance')
# app.register_blueprint(subject_bp, url_prefix='/subjects')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

