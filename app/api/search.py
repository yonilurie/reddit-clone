from unittest import result
from flask import request, jsonify, Blueprint
from app.api.user_routes import users
from app.models import SubReddit, User, Post


search_routes = Blueprint('search', __name__)


@search_routes.route('')
def general_search():
    '''
    Search in navabar, queries for posts subreddits and users
    '''
    result = {}
    search = request.args.get('s')

    posts_obj = {}
    posts = Post.query.filter(Post.title.ilike(f"%{search}%"))
    for post in posts:
        posts_obj[post.id] = post.to_dict()

    users_obj = {}
    users = User.query.filter(User.username.ilike(f"%{search}%"))
    for user in users:
        users_obj[user.id] = user.to_dict()

    subreddits_obj = {}
    subs = SubReddit.query.filter(SubReddit.name.ilike(f"%{search}%"))
    for sub in subs:
        subreddits_obj[sub.id] = sub.to_dict()

    result['subreddits'] = subreddits_obj
    result['posts'] = posts_obj
    result['users'] = users_obj

    return jsonify(result)


