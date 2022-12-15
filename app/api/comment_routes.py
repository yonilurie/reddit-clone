

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import  db, Comment, Post, CommentVote
from app.forms.comment_form import CommentForm, DeleteCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def add_comment(post_id):
    '''
    Add a comment to a post
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify(form.errors)

    new_comment = Comment(
        user_id = current_user.id,
        post_id = post_id,
        text = form.data['comment']
    )
    db.session.add(new_comment)
    db.session.commit()
    # Initially comment is upvoted by user
    new_vote = CommentVote(
        comment_id = new_comment.id,
        user_id = current_user.id,
        upvote = True
    )
    db.session.add(new_vote)
    db.session.commit()
    post = Post.query.get(post_id)
    return post.to_dict()

@comment_routes.route('/<int:post_id>/reply/<string:original_comment_id>', methods=['POST'])
@login_required
def add_comment_reply(post_id, original_comment_id):
    '''
    Reply to a comment in a post
    '''
    original_comment = Comment.query.get(original_comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify(form.errors)

    new_comment = Comment(
        user_id = current_user.id,
        post_id = post_id,
        text = form.data['comment'],
        parent = original_comment
    )
    new_comment.save()
    # Initially comment is upvoted by user
    new_vote = CommentVote(
        comment_id = new_comment.id,
        user_id = current_user.id,
        upvote = True
    )
    db.session.add(new_vote)
    db.session.commit()
    post = Post.query.get(post_id)
    return post.to_dict()

@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    '''
    Delete a comment
    '''
    form = DeleteCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify(form.errors)

    comment_to_delete = Comment.query.get(comment_id)
    if not comment_to_delete:
        return jsonify({'Message': 'Comment not found'})
    if current_user.id != comment_to_delete.user_id:
        return jsonify({'Message': "Can't delete another users comment"})

    db.session.delete(comment_to_delete)
    db.session.commit()
    post = Post.query.get(comment_to_delete.post_id)
    return post.to_dict()

@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    '''
    Edit a comment
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify(form.errors)
        
    comment_to_edit = Comment.query.get(comment_id)
    if comment_to_edit.user_id != current_user.id:
        return jsonify({'Message': 'Cannot edit another users comment'})
    
    comment_to_edit.text = form.data['comment']
    db.session.commit()
    post = Post.query.get(comment_to_edit.post_id)
    return post.to_dict()