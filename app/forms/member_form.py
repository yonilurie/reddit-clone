from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import SubReddit

def subreddit_exists(form, field):
    subreddit_id = field.data
    sub = SubReddit.query.get(subreddit_id)
    if not sub:
        raise ValidationError('Subreddit does not exist')

class MemberForm(FlaskForm):
   subreddit_id = IntegerField('subreddit_id', validators=[DataRequired()])