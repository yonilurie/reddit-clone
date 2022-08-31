from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import SubReddit, Post, db
from app.forms.post_form import PostForm

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
    sub = SubReddit.query.filter(SubReddit.name == name).first() 
    if sub is not None:
        return sub.to_dict()
    else:
        return jsonify({
            "error": "Subreddit not found"
        })

@subreddit_routes.route('/<string:name>/posts')
def get_newest_subreddit_posts(name, page=0):
    """
    Returns a single subreddits newest 
    """
    sub = SubReddit.query.filter(SubReddit.name == name).first()
    if sub is None:
        return jsonify({
            "error": "Subreddit not found"
        })
        
    
    return sub.__posts__()

@subreddit_routes.route('/<string:name>/post', methods=['POST'])
@login_required
def create_post(name):
    '''
    Post to a subreddit
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            subreddit_id = form.data['subreddit_id'],
            title = form.data['title'],
            type_of_post = form.data['type_of_post'],
            user_id = current_user.id,
            tags = form.data['tags'],
            link = form.data['link'],
            text = form.data['text']

        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return jsonify(form.errors)





@subreddit_routes.route('/<string:name>/<int:post_id>')
def get_post_details(name, post_id):
    """
    Get a specific posts details
    """

    post = Post.query.get(post_id)
    if not post:
        return jsonify({
            "error": "Post not found"
        })

    comments_list = post.__comments__()

    vote_stats = None
    if current_user:
        vote_stats = post.__votes__(current_user.id)
    else:
        vote_stats = post.__votes__()

    post = post.to_dict()
    post['comments'] = comments_list["comments"]
    post['vote_stats'] = vote_stats
    return jsonify(post)

