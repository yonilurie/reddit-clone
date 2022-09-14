from app.models.post import Post
from .db import db

from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user = db.relationship("User", back_populates="comments")
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    post = db.relationship("Post", back_populates="comments")
    text = db.Column(db.String(10000), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())


    votes = db.relationship("CommentVote", back_populates="comment", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "text": self.text,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user": {"username": self.user.username, "profile_image": self.user.profile_image},
            "votes": self.__votes__()
        }

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