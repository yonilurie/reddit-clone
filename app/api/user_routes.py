from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    '''
    Returns all users
    '''
    users = User.query.all()
    return jsonify({'users': [user.to_dict() for user in users]})

@user_routes.route('/<string:username>')
def get_user(username):
    """
    Returns a single user by their username
    """
    user_query = User.query.filter(User.username == username).first() 
    if user_query is None:
        return jsonify({"error": "User not found"})
    
    comments = user_query.__comments__()
    posts = user_query.__posts__()
    user = user_query.to_dict()
    user['comments'] = comments['comments']
    user['posts'] = posts['posts']
    return jsonify(user)