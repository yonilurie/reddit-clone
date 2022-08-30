from app.api.user_routes import user
from .db import db
from .vote import Vote
from sqlalchemy.sql import func
from flask import jsonify

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

            "comment_count": len(self.comments)
        }

    def __comments__(self):
        return {"comments": [comment.to_dict() for comment in self.comments]}

    def __votes__(self, user_id):
        votes_list = self.votes
        total = 0
        upvotes = 0
        downvotes = 0
        current_user_upvoted = False
        for vote in votes_list:
            if user_id == vote.user_id:
                current_user_upvoted = True
            if vote.upvote:
                upvotes += 1
            else: 
                downvotes += 1
            total += 1
    
        vote_stats = {"upvote_count": upvotes, "downvote_count": downvotes, "total": total, "current_user_upvoted": current_user_upvoted}
        return vote_stats
        