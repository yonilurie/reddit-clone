from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<string:username>')
def get_user(username):
    """
    Returns a single user by their username
    """
    user_query = User.query.filter(User.username == username).first() 
    if user_query is not None:
        comments = user_query.__comments__()
        posts = None
        if current_user.id:
            posts = user_query.__posts__(current_user.id)
        else:
            posts = user_query.__posts__(None)
        user = user_query.to_dict()
        print(posts)
        user['comments'] = comments['comments']
        user['posts'] = posts['posts']
        return jsonify(user)
    else:
        return jsonify({
            "error": "User not found"
        })