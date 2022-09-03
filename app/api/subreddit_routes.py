
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import SubReddit, Post, db
from app.forms.post_form import PostForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)
import random
subreddit_routes = Blueprint('subreddits', __name__)

@subreddit_routes.route('/list-all')
def all_subreddits():
    """
    Returns a list of all subreddits
    """
    subs = SubReddit.query.all()

    list_of_subs = [sub.to_dict() for sub in subs]
    random_five = random.sample(list_of_subs, k=5)
    return jsonify(random_five)

@subreddit_routes.route('/<int:post_id>')
def get_post_details( post_id):
    """
    Get a specific posts details
    """

    post = Post.query.get(post_id)
    if not post:
        return jsonify({
            "error": "Post not found"
        })

    comments_list = post.__comments__()
    vote_stats = post.__votes__()

    post = post.to_dict()
    post['comments'] = comments_list["comments"]
    post['vote_stats'] = vote_stats
    return jsonify(post)



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

@subreddit_routes.route('/<int:id>/posts')
def get_newest_subreddit_posts(id, page=0):
    """
    Returns a single subreddits newest 
    """
    sub = SubReddit.query.get(id)
    if sub is None:
        return jsonify({
            "error": "Subreddit not found"
        })
        
    posts = Post.query.filter(Post.subreddit_id == id)

    return jsonify([post.to_dict() for post in posts])

@subreddit_routes.route('/<int:id>/post', methods=['POST'])
@login_required
def create_post(id):
    '''
    Post to a subreddit
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            subreddit_id = id,
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








    
@subreddit_routes.route('/<int:id>/post/image', methods=['POST'])
@login_required
def create_post_image(id):
    '''
    Post image to a subreddit with aws storing
    '''
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": "image required"}, 400
    
        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]

        post = Post(
            subreddit_id = id,
            title = form.data['title'],
            type_of_post = form.data['type_of_post'],
            user_id = current_user.id,
            tags = form.data['tags'],
            image = url,
            text = form.data['text']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return jsonify(form.errors)