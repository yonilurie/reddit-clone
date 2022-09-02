
from .db import db

from sqlalchemy.sql import func

class Vote(db.Model):
    __tablename__ = "votes"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    upvote = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    post = db.relationship("Post", back_populates="votes")
    user = db.relationship("User", back_populates="votes")
 
    # comment = db.relationship("Comment", back_populates="votes")
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "upvote": self.upvote,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "post": self.post.to_dict()
        }