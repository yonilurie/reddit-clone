from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Vote, Post, db, CommentVote, Comment
from app.forms.vote_form import VoteForm, CommentVoteForm

vote_routes = Blueprint('votes', __name__)


@vote_routes.route('', methods=['POST'])
@login_required
def upvote():
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        vote = Vote.query.filter(Vote.post_id == form.data['post_id'], Vote.user_id == current_user.id ).first()
        if not vote:
          user_vote = None
          if form.data['upvote'] == 'true':
              user_vote = True
          elif form.data['upvote'] == "false":
              user_vote = False
          new_vote = Vote(
              post_id=form.data['post_id'],
              user_id = current_user.id,
              upvote= user_vote
          )
          db.session.add(new_vote)
          db.session.commit()
          return new_vote.post.to_dict()

        else:
            curr_vote = vote.upvote
            post_id = vote.post_id
            if form.data['upvote'] == 'true' and curr_vote == True:
                db.session.delete(vote)
                db.session.commit()
            elif form.data['upvote'] == 'false' and curr_vote == True:
                vote.upvote = False
                db.session.commit()
            elif form.data['upvote'] == 'true' and curr_vote == False:
                vote.upvote = True
                db.session.commit()
            elif form.data['upvote'] == 'false' and curr_vote == False:
                db.session.delete(vote)
                db.session.commit()
            return Post.query.get(post_id).to_dict()
    else:
        return form.errors


@vote_routes.route('/comment', methods=['POST'])
@login_required
def upvote_comment():
        form = CommentVoteForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            vote = CommentVote.query.filter(CommentVote.comment_id == form.data['comment_id'], CommentVote.user_id == current_user.id ).first()
            if not vote:
                user_vote = None
                if form.data['upvote'] == 'true':
                    user_vote = True
                elif form.data['upvote'] == "false":
                    user_vote = False
                new_vote = CommentVote(
                    comment_id=form.data['comment_id'],
                    user_id = current_user.id,
                    upvote= user_vote
                )
                db.session.add(new_vote)
                db.session.commit()
                return Post.query.get(form.data['post_id']).to_dict()
            else:
                curr_vote = vote.upvote
                comment_id = vote.comment_id
                if form.data['upvote'] == 'true' and curr_vote == True:
                    db.session.delete(vote)
                    db.session.commit()
                elif form.data['upvote'] == 'false' and curr_vote == True:
                    vote.upvote = False
                    db.session.commit()
                elif form.data['upvote'] == 'true' and curr_vote == False:
                    vote.upvote = True
                    db.session.commit()
                elif form.data['upvote'] == 'false' and curr_vote == False:
                    db.session.delete(vote)
                    db.session.commit()
                return Post.query.get(form.data['post_id']).to_dict()
        else:
            return form.errors