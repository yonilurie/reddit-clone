
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import SubReddit, Post, db
from app.forms.post_form import PostForm, PostFormEdit
from app.forms.delete_form import DeleteForm
from app.forms.subreddit_form import SubredditForm, SubredditRulesForm, SubredditCommunityForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_object)
import random
subreddit_routes = Blueprint('subreddits', __name__)

@subreddit_routes.route('/list-five')
def five_subreddits():
    """
    Returns a list of all subreddits
    """
    subs = SubReddit.query.all()

    list_of_subs = [sub.to_dict() for sub in subs]
    random_five = random.sample(list_of_subs, k=5)
    return jsonify(random_five)
@subreddit_routes.route('/list-all')
def all_subreddits():
    """
    Returns a list of all subreddits
    """
    subs = SubReddit.query.all()

    return jsonify([sub.to_dict() for sub in subs])

@subreddit_routes.route('/home')
def home_page():
    pass
    subs = SubReddit.query.all()
    list_of_subs = [sub.to_dict() for sub in subs]
    random_five = random.sample(list_of_subs, k=5)
    rand_posts = []
    for subreddit in random_five:
        posts = Post.query.filter(Post.subreddit_id == subreddit['id'])
        [rand_posts.append(post.to_dict()) for post in posts]


    home_posts = None
    if len(rand_posts) > 20:
        home_posts = random.sample(rand_posts, k=20)
    else:
        home_posts = random.sample(rand_posts, k=len(rand_posts))
    return jsonify(home_posts)



@subreddit_routes.route('/create', methods=['POST'])
def create_subreddit():
    form = SubredditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_subreddit = SubReddit(
            name= form.data['subreddit_name'],
            owner_id = form.data['owner_id']
        )
        db.session.add(new_subreddit)
        db.session.commit()
        return new_subreddit.to_dict()
    else:
        return jsonify({
            "errors": f"r/{form.data['subreddit_name']} is already taken, please try another name"
        })

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

@subreddit_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    """
    Delete a single post
    """
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        post = Post.query.get(post_id)
        db.session.delete(post)
        db.session.commit()
        return jsonify({
            "message": "Post Deleted Succesfully"
        })
    
    else:
        return form.errors

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

@subreddit_routes.route('/<string:sub_name>/posts')
def get_newest_subreddit_posts(sub_name, page=0):
    """
    Returns a single subreddits newest posts
    """
    sub = SubReddit.query.filter(SubReddit.name == sub_name).first() 
    if sub is None:
        return jsonify({
            "error": "Subreddit not found"
        })
        
    posts = Post.query.filter(Post.subreddit_id == sub.id )

    return jsonify([post.to_dict() for post in posts])

@subreddit_routes.route('/<int:id>/post', methods=['POST'])
@login_required
def create_post(id):
    '''
    Post to a subreddit
    '''
    form = PostForm()
    print(form['subreddit_id'])
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

@subreddit_routes.route('/<int:id>/post/edit', methods=['PUT'])
@login_required
def edit_post(id):
    '''
    Post to a subreddit
    '''
    form = PostFormEdit()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(id)
        # if form.data['text']:
        post.text = form.data['text']
        # elif form.data['link']:
        post.link = form.data['link']
        db.session.commit()
        updated_post = Post.query.get(id)
        return updated_post.to_dict()
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


@subreddit_routes.route('/<int:id>/rules', methods=['PUT'])
@login_required
def edit_rules(id): 
    form = SubredditRulesForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        sub = SubReddit.query.get(id)
        sub.rules = form.data['rules']
        db.session.commit()
        return sub.to_dict()
    else: 
       return  jsonify(form.errors)

@subreddit_routes.route('/<int:id>/community', methods=['PUT'])
@login_required
def edit_community_settings(id): 
    form = SubredditCommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        sub = SubReddit.query.get(id)
        if not sub:
            return jsonify({
                "errors": 'Subreddit not found'
            })
        sub.description = form.data['description']
        sub.display_name = form.data['display_name']
        db.session.commit()
        return sub.to_dict()
    else: 
       return  jsonify(form.errors)



@subreddit_routes.route('/<int:id>/delete-subreddit', methods=['DELETE'])
@login_required
def delete_subreddit(id):
    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        sub = SubReddit.query.get(id)
        db.session.delete(sub)
        db.session.commit()
        return jsonify({
            "message": 'succesfully deleted'
        })
        
    else:
        return jsonify(form.errors)