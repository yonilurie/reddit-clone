from app.models import db, SubReddit


# Adds a demo user, you can add other users here if you want
def seed_subreddits():
    sub1 = SubReddit(
        name='dogs', owner_id=1, color='#f5e0ae')
    sub2 = SubReddit(
        name='cats', owner_id=2, color='#fca547')
    sub3 = SubReddit(
        name='views', owner_id=3, color='#8768e3')
    sub4 = SubReddit(
        name='seattle', owner_id=4, color='#2d387d')
    sub5 = SubReddit(
        name='gaming', owner_id=5, color='#f54242')
    sub6 = SubReddit(
        name='appacademy', owner_id=6 , color='#c00a0a')

    db.session.add(sub1)
    db.session.add(sub2)
    db.session.add(sub3)
    db.session.add(sub4)
    db.session.add(sub5)
    db.session.add(sub6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_subreddits():
    db.session.execute('TRUNCATE subreddits RESTART IDENTITY CASCADE;')
    db.session.commit()
