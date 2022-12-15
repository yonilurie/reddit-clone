from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import SubReddit, User

def subreddit_exists(form, field):
    subreddit_name = field.data
    sub = SubReddit.query.filter(SubReddit.name == subreddit_name).first() 
    if sub:
        raise ValidationError(f'r/{subreddit_name} is already taken, please choose another name')
    user = User.query.filter(User.username == subreddit_name).first() 
    if user:
        raise ValidationError(f'Subreddit name can not match a users name')

class SubredditForm(FlaskForm):
    subreddit_name = StringField('subreddit_name', validators=[DataRequired(), subreddit_exists,  Length(min=2, max=21)])
    owner_id = IntegerField("owner_id", validators=[DataRequired(message='Owner id is required')])

class SubredditRulesForm(FlaskForm):
    rules = StringField('rules')

class SubredditCommunityForm(FlaskForm):
    display_name = StringField('display_name', validators=[Length(min=0, max=100)])
    description = StringField('description', validators=[Length(min=0, max=500)])
    color = StringField('color')