from app.models import db, Post, subreddit


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        subreddit_id=1, user_id=1, title='Test', type_of_post='text', text='This is a test')
    post2 = Post(
        subreddit_id=1, user_id=2, title='Test', type_of_post='text', text='This is a test')
    post3 = Post(
        subreddit_id=2,user_id=3, title='Test', type_of_post='text', text='This is a test')

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
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
