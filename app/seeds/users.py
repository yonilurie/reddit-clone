from app.models import db, User

def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='acidicsister', email='marnie@aa.io', password='password')
    bobbie = User(
        username='elementarydepth', email='bobbie@aa.io', password='password')
    todd = User(
        username='infiniteidea', email='todd@aa.io', password='password')
    bob = User(
        username='aheadweakness', email='bob@aa.io', password='password')
    beth = User(
        username='harmfulcampaign', email='beth@aa.io', password='password')
    buck = User(
        username='mereborder', email='buck@aa.io', password='password')
    mandy = User(
        username='overduebonus', email='mandy@aa.io', password='password')
    veronica = User(
        username='pointedboss', email='veronica@aa.io', password='password')
    leo = User(
        username='absentmagazine', email='leo@aa.io', password='password')
    jocelyn = User(
        username='eighthistorianl', email='jocelyn@aa.io', password='password')
    chuck = User(
        username='uttermostaside', email='chuck@aa.io', password='password')
    sally = User(
         username='stupidcriticism', email='sally@aa.io', password='password')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(todd)
    db.session.add(bob)
    db.session.add(beth)
    db.session.add(buck)
    db.session.add(mandy)
    db.session.add(veronica)
    db.session.add(leo)
    db.session.add(jocelyn)
    db.session.add(chuck)
    db.session.add(sally)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
