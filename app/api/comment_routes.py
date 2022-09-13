

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, user_logged_in
from app.models import  db, Comment


from app.forms.comment_form import CommentForm, DeleteCommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def add_comment(post_id):
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
        return new_comment.to_dict()
    else:
        return jsonify(form.errors)

@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
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
        else:
            return jsonify({
                'Message': "Can't delete another users comment"
            })
        return jsonify({"Message": 'Comment Deleted'})
    else:
        return jsonify(form.errors)


@comment_routes.route('/<int:comment_id>/edit', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment_to_edit = Comment.query.get(comment_id)
        if comment_to_edit.user_id == current_user.id:
            comment_to_edit.text = form.data['comment']
            db.session.commit()
            return_comment = Comment.query.get(comment_id)
            return return_comment.to_dict()
        else:
            return jsonify({'Message': 'Cannot edit another users comment'})
    else:
        return jsonify(form.errors)