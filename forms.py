from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired

class fileUpload(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    comments = StringField('Comments')
    prescription = FileField(validators=[FileRequired()])
    submit = StringField('Upload')




