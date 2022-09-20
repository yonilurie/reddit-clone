from os import link
from app.models import db, Post, subreddit


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        subreddit_id=1, user_id=1, title='I love dogs', type_of_post='text', text='Honestly, dogs are the best. How could anyone think that cats are better? A cat will not even play fetch with you, and they hate walks. To each their own I suppose...')
    post2 = Post(
        subreddit_id=1, user_id=1, title='Some basic info about dogs', type_of_post='link', link='https://en.wikipedia.org/wiki/Dog')
    post3 = Post(
        subreddit_id=1,user_id=1, title='Some great info about breeds', type_of_post='link', text='https://www.petfinder.com/dog-breeds/')
    post4 = Post(
        subreddit_id=2, user_id=2, title='Great info about cats', type_of_post='link', link='https://en.wikipedia.org/wiki/Cat')
    post5 = Post(
        subreddit_id=2, user_id=2, title='Cats the musical', type_of_post='link', link='https://www.catsthemusical.com/')
    post6 = Post(
        subreddit_id=2,user_id=2, title='Why cats are better than dogs', type_of_post='link', link='https://www.thesprucepets.com/why-cats-are-better-than-dogs-554880')
    post7 = Post(
        subreddit_id=3, user_id=3, title='Great article on landscapes', type_of_post='link', link='https://en.wikipedia.org/wiki/Landscape')
    post8 = Post(
        subreddit_id=3, user_id=3, title='50 of the best views in the world!', type_of_post='link', link='https://www.insider.com/best-views-in-world-travel-landmarks-2019-7')
    post9 = Post(
        subreddit_id=3,user_id=3, title='Hiking advice', type_of_post='text', text='Greetings r/views! I am looking for some advice. I recently moved to the seattle are and would like to know of any good views around, if the view requires a hike then even better!')
    post10 = Post(
        subreddit_id=4, user_id=4, title='Great restaraunts in Seattle', type_of_post='link', link='https://seattle.eater.com/maps/best-restaurants-seattle-38')
    post11 = Post(
        subreddit_id=4, user_id=4, title='Article about Seattle', type_of_post='link', link='https://en.wikipedia.org/wiki/Seattle')
    post12 = Post(
        subreddit_id=4,user_id=4, title='I love Seattle', type_of_post='text', text='I just moved here and I wanted to say, Seattle is amazing!')
    post13 = Post(
        subreddit_id=5, user_id=5, title='New games coming soon', type_of_post='link', link='https://www.gamespot.com/articles/2022-upcoming-games-release-schedule/1100-6499287/')
    post14 = Post(
        subreddit_id=5, user_id=5, title='Reccomendations for an RPG', type_of_post='text', text="Hello r/games, I was wondering if there are any good RPG's you could reccomend? I loved Fallout 3 and the Elder Scrolls series.")
    post15 = Post(
        subreddit_id=5,user_id=5, title='Hey gamers', type_of_post='text', text='Wazzapp')
    

    list = [post1,post2,post3,post4,post5,post6,post7,post8,post9,post10,post11,post12,post13,post14,post15]
    for post in list:
        db.session.add(post)
        db.session.commit()
    return 

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
