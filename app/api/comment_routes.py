

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, user_logged_in
from app.models import  comment, db, Comment, SubReddit, Post, post


from app.forms.comment_form import CommentForm, DeleteCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def add_comment(post_id):
    '''
    Add a comment to a post
    '''
    for comment in Comment.query.filter_by(post_id=post_id).order_by(Comment.path.asc()):
        print('{}{}: {}'.format('  ' * comment.level(), comment.user, comment.text))
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            post_id = post_id,
            text = form.data['comment']
        )
        db.session.add(new_comment)
        db.session.commit()
        post = Post.query.get(post_id)
        return post.to_dict()

    else:
        return jsonify(form.errors)

@comment_routes.route('/<int:post_id>/reply/<string:original_comment_id>', methods=['POST'])
@login_required
def add_comment_reply(post_id, original_comment_id):
    '''
    Reply to a comment in a post
    '''
    original_comment = Comment.query.get(original_comment_id)
    print(original_comment)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            post_id = post_id,
            text = form.data['comment'],
            parent = original_comment
        )
        new_comment.save()
        post = Post.query.get(post_id)
        return post.to_dict()

    else:
        return jsonify(form.errors)



@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    '''
    Delete a comment
    '''
    form = DeleteCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment_to_delete = Comment.query.get(comment_id)
        if not comment_to_delete:
            return jsonify({
                'Message': 'Comment not found'
            })
        if current_user.id == comment_to_delete.user_id:

            db.session.delete(comment_to_delete)
            db.session.commit()
            post = Post.query.get(comment_to_delete.post_id)
            return post.to_dict()
        else:
            return jsonify({
                'Message': "Can't delete another users comment"
            })
        
    else:
        return jsonify(form.errors)


@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    '''
    Edit a comment
    '''
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment_to_edit = Comment.query.get(comment_id)
        if comment_to_edit.user_id == current_user.id:
            comment_to_edit.text = form.data['comment']
            db.session.commit()
    
            post = Post.query.get(comment_to_edit.post_id)
            return post.to_dict()
        else:
            return jsonify({'Message': 'Cannot edit another users comment'})
    else:
        return jsonify(form.errors)