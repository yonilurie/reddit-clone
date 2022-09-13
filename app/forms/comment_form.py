


from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, URL
from app.models import SubReddit, subreddit, User,  Post


def post_exists(form, field):
    post_id = field.data
    post = Post.query.get(post_id)
    if not post:
        raise ValidationError('Post not found')

def user_exists(form, field):
    user_id = field.data
    user = Post.query.get(user_id)
    if not user:
        raise ValidationError('User not found')


   

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(), Length(min=1, max=10000, message='Comment must be between 1 and 10,000 characters')])

class DeleteCommentForm(FlaskForm):
    pass
