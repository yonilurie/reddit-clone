from tokenize import String
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import Subreddit, User


def subreddit_exists(form, field):
    subreddit_id = field.data
    subreddit = Subreddit.query.get(subreddit_id)
    if not subreddit:
        raise ValidationError('Subreddit not found')

class PostForm(FlaskForm):
    subreddit_id = IntegerField("subreddit_id", validators=[DataRequired(), subreddit_exists ])
    user_id = IntegerField("subreddit_id", validators=[DataRequired()])
    tags = StringField("tags")
    title = StringField("title", validators=[DataRequired(), Length(min=1, max=21)])
    type_of_post = StringField("type_of_post", validators=[DataRequired()])
    link = StringField("link")

    
