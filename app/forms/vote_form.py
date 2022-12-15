from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class VoteForm(FlaskForm):
   post_id = IntegerField('post_id', validators=[DataRequired()])
   upvote = StringField('upvote', validators=[DataRequired()])

class CommentVoteForm(FlaskForm):
   comment_id = IntegerField('comment_id', validators=[DataRequired()])
   post_id = IntegerField('post_id', validators=[DataRequired()])
   upvote = StringField('upvote', validators=[DataRequired()])