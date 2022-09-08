from tokenize import String
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import SubReddit, subreddit


def subreddit_exists(form, field):
    subreddit_name = field.data
    sub = SubReddit.query.filter(SubReddit.name == subreddit_name).first() 
    if sub:
        raise ValidationError(f'r/{subreddit_name} is already taken, please choose another name')

class SubredditForm(FlaskForm):
    subreddit_name = StringField('subreddit_name', validators=[DataRequired(), subreddit_exists, Length(min=1, max=21)])
    owner_id = IntegerField("owner_id", validators=[DataRequired(message='Ownerid is required')])


class SubredditRulesForm(FlaskForm):
    rules = StringField('rules')

class SubredditCommunityForm(FlaskForm):
    display_name = StringField('display_name', validators=[Length(min=0, max=100)])
    description = StringField('description', validators=[Length(min=0, max=500)])