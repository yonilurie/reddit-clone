from app.models import db, Vote


# Adds a demo user, you can add other users here if you want
def seed_votes():
    Vote1 = Vote(
        post_id=1, user_id=1, upvote=True)
    Vote2 = Vote(
        post_id=1, user_id=1, upvote=True)
    Vote3 = Vote(
        post_id=1, user_id=1, upvote=True)

    db.session.add(Vote1)
    db.session.add(Vote2)
    db.session.add(Vote3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()
