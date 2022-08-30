from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    Comment1 = Comment(
        user_id=1, post_id=2, text='This is a test')
    Comment2 = Comment(
        user_id=1, post_id=3, text='This is a test')
    Comment3 = Comment(
        user_id=2, post_id=2, text='This is a test')

    db.session.add(Comment1)
    db.session.add(Comment2)
    db.session.add(Comment3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
    # def to_dict(self):
    #     return {
    #         "id": self.id,
    #         "subreddit_id": self.post_id,
    #         "user_id": self.user_id,
    #         "tags": self.tags,
    #         "title": self.title,
    #         "type_of_post": self.type_of_post,
    #         "text": self.text,
    #         "link": self.link,
    #         "created_at": self.created_at,
    #         "updated_at": self.updated_at
    #     }
