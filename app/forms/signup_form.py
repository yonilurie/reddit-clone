from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from ..models import User, SubReddit


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def subreddit_exists(form, field):
    subreddit_name = field.data
    sub = SubReddit.query.filter(SubReddit.name == subreddit_name).first() 
    if sub:
        raise ValidationError(f'{subreddit_name} is already taken, please choose another username')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, subreddit_exists, Length(min=4, max=40, message='Username must be between 4 and 40 characters')])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(max=255, message='Email must be less than 255 characters')])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=64, message='Password must be between 6 and 64 characters')])
