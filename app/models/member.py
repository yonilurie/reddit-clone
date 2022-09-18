from .db import db
from sqlalchemy.sql import func

class Member(db.Model):
    __tablename__ = "members"
    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    users = db.relationship("User", back_populates="member")
    subreddits_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"), nullable=False)
    subreddits = db.relationship("SubReddit", back_populates="members")
    moderator = db.Column(db.Boolean(), default=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    def to_dict(self):
        return {
            "id":self.id,
            "users_id": self.users_id,
            "subreddits_id": self.subreddits_id,
            "moderator": self.moderator,
            'subreddit_info': self.subreddits.to_dict(),
            
            
        }