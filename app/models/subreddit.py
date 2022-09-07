from .db import db
from sqlalchemy.sql import func
from flask import jsonify

class SubReddit(db.Model):
    __tablename__ = "subreddits"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(21), nullable=False, unique=True)
    display_name = db.Column(db.String(100), nullable=True, default="")
    banner_image = db.Column(db.String, nullable=True, default="")
    description = db.Column(db.String(500), nullable=True, default="")
    topics = db.Column(db.String, nullable=True, default = "")
    allowed_post_types = db.Column(db.String, nullable=True, default = "")
    rules = db.Column(db.String, nullable=True, default = "")
    text_body = db.Column(db.String, nullable=True, default = "")
    require_flair = db.Column(db.Boolean, nullable=True, default=False)
    banned_words = db.Column(db.String, nullable=True, default = "")
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    owner = db.relationship("User", back_populates="subreddits")
    members = db.relationship("Member", back_populates="subreddits", cascade="all, delete-orphan")
    posts = db.relationship("Post", back_populates="subreddit", cascade='all, delete-orphan')
    def to_dict(self):
        return {
            "id": self.id,
            "owner": {"owner_id": self.owner.id,"username": self.owner.username, "profile_image": self.owner.profile_image}, 
            "name": self.name,
            "display_name": self.display_name,
            "banner_image": self.banner_image,
            "description": self.description,
            "topics": self.topics,
            "allowed_post_types": self.allowed_post_types,
            "rules": self.rules,
            "text_body": self.text_body,
            "require_flair": self.require_flair,
            "banned_words": self.banned_words,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "members": len(self.members),
        }

    def __posts__(self):
        return [post.to_dict() for post in self.posts]