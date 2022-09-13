from sqlalchemy import false, null
from .db import db
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
    link = db.Column(db.String, nullable=True, default = "")
    image = db.Column(db.String, nullable=True, default = "") 
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    votes = db.relationship("Vote", back_populates="post", cascade="all, delete-orphan")
    subreddit = db.relationship("SubReddit", back_populates="posts")
    def to_dict(self, ):
        return {
            "id": self.id,
            "subreddit_id": self.subreddit_id,
            "subreddit_name": self.subreddit.name,
            "user_id": self.user_id,
            "tags": self.tags,
            "title": self.title,
            "type_of_post": self.type_of_post,
            "text": self.text,
            "link": self.link,
            "image": self.image,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": {"username": self.user.username},
            "comments": [comment.to_dict() for comment in self.comments],
            "comment_count": len(self.comments),
            "votes": self.__votes__()
        }

    def __comments__(self):
        return {"comments": [comment.to_dict() for comment in self.comments]}

    def __votes__(self):
        votes_list = self.votes
        total = 0
        upvotes = 0
        downvotes = 0
        for vote in votes_list:
            if vote.upvote:
                upvotes += 1
            else: 
                downvotes += 1
            total += 1
    
        vote_stats = {"upvote_count": upvotes, "downvote_count": downvotes, "total": total}
        return vote_stats
        