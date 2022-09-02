from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    gender = db.Column(db.String, nullable=True, default="")
    display_name = db.Column(db.String(30), nullable=True, default="")
    about = db.Column(db.String(200), nullable=True, default="")
    social_links = db.Column(db.String, nullable=True, default="")
    profile_image = db.Column(db.String, nullable=True, default="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png")
    banner_image = db.Column(db.String, nullable=True, default="")
    dark_mode = db.Column(db.Boolean, nullable=True, default=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    votes = db.relationship("Vote", back_populates="user", cascade="all, delete-orphan")
    subreddits = db.relationship("SubReddit", back_populates="owner", cascade="all, delete-orphan")
    member = db.relationship("Member", back_populates="users", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "gender": self.gender,
            "display_name": self.display_name,
            "about": self.about,
            "social_links": self.social_links,
            "profile_image": self.profile_image,
            "banner_image": self.banner_image,
            "dark_mode": self.dark_mode,
            "subreddits": [subreddit.to_dict() for subreddit in self.subreddits],
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "votes": [vote.to_dict()for vote in self.votes],
        }

    def __comments__(self):
         return {"comments": [{"id": comment.id, "post_id": comment.post_id, "text": comment.text, "created_at": comment.created_at, "updated_at": comment.updated_at, "post_title":comment.post.title, "post_user": comment.post.user.username, "post_subreddit": comment.post.subreddit.name} for comment in self.comments]}

    def __posts__(self):
        return {"posts": [{"title": post.title, "id": post.id, "text": post.text, "votes": post.__votes__(),  "user": {"username":post.user.username}, "subreddit": post.subreddit.name, "comment_count": post.to_dict()["comment_count"], "image": post.image, "link": post.link, "created_at": post.created_at, "updated_at": post.updated_at, "type_of_post": post.type_of_post} for post in self.posts]}