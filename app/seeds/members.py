from app.models import db, Member


# Adds a demo user, you can add other users here if you want
def seed_members():
    Member1 = Member(
        users_id=1, subreddits_id=6, moderator=False)
    Member2 = Member(
        users_id=2, subreddits_id=4, moderator=False)
    Member3 = Member(
        users_id=3, subreddits_id=2, moderator=False)
    Member4 = Member(
        users_id=4, subreddits_id=1, moderator=False)
    Member5 = Member(
        users_id=5, subreddits_id=5, moderator=False)
    Member6 = Member(
        users_id=6, subreddits_id=3, moderator=False)

    db.session.add(Member1)
    db.session.add(Member2)
    db.session.add(Member3)
    db.session.add(Member4)
    db.session.add(Member5)
    db.session.add(Member6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
