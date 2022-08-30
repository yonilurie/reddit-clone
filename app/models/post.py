from .db import db
from .vote import Vote
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="posts")
    tags = db.Column(db.String, nullable=True, default = "")
    title = db.Column(db.String(300), nullable=False, default = "")
    type_of_post = db.Column(db.String, nullable=False, default = "")
    text = db.Column(db.String(10000), nullable=False, default = "")
    link = db.Column(db.String, nullable=False, default = "")
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    votes = db.relationship("Vote", back_populates="post", cascade="all, delete-orphan")
    subreddit = db.relationship("SubReddit", back_populates="posts")
    def to_dict(self):
        return {
            "id": self.id,
            "subreddit_id": self.subreddit.id,
            "user_id": self.user_id,
            "tags": self.tags,
            "title": self.title,
            "type_of_post": self.type_of_post,
            "text": self.text,
            "link": self.link,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "votes": [{f"vote.id": vote.to_dict()} for vote in self.votes],
            "comments": [comment.to_dict() for comment in self.comments]
        }
