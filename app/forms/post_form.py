from tokenize import String
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import SubReddit


def subreddit_exists(form, field):
    subreddit_id = field.data
    print(subreddit_id)
    subreddit = SubReddit.query.get(subreddit_id)
    print(subreddit)
    if not subreddit:
        raise ValidationError('Subreddit not found')

class PostForm(FlaskForm):
    subreddit_id = IntegerField("subreddit_id", validators=[DataRequired(message='Subreddit id is required'), subreddit_exists ])
    tags = StringField("tags")
    title = StringField("title", validators=[DataRequired(message='Title is required'), Length(min=1, max=300, message='Post title must be between 1 and 300 characters')])
    type_of_post = StringField("type_of_post", validators=[DataRequired(message='Must include type of post')])
    link = StringField("link")
    image = StringField("image")
    text = StringField("text", validators=[Length(min=0, max=10000, message='Text must be less than 10,000 characters')])

    
class PostFormEdit(FlaskForm):
    text = StringField("text", validators=[Length(min=0, max=10000, message='Text must be less than 10,000 characters')])
    link = StringField('link')