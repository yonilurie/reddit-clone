from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import SubReddit, db

subreddit_routes = Blueprint('subreddits', __name__)


@subreddit_routes.route('/list-all')
def all_subreddits():
    """
    Returns a list of all subreddits
    """
    subs = SubReddit.query.all()
    return {'subreddits': [sub.to_dict() for sub in subs]}


@subreddit_routes.route('/<string:name>')
def get_subreddit(name):
    """
    Returns a single subreddit
    """
    print(name)
    sub = SubReddit.query.filter(SubReddit.name == name).first() 
    if sub is not None:
        return sub.to_dict()
    else:
        return jsonify({
            "error": "Subreddit not found"
        })
