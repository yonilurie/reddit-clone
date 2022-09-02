from flask_login import user_logged_in
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError

class VoteForm(FlaskForm):
   post_id = IntegerField('post_id', validators=[DataRequired()])
   upvote = StringField('upvote', validators=[DataRequired()])