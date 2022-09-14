
from .db import db

from sqlalchemy.sql import func

class CommentVote(db.Model):
    __tablename__ = "comment_votes"

    id = db.Column(db.Integer, primary_key=True)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    upvote = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    comment = db.relationship("Comment", back_populates="votes")
    user = db.relationship("User", back_populates="comment_votes")
 
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "comment_id": self.comment_id,
            "upvote": self.upvote,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "post": self.comment.to_dict()
        }