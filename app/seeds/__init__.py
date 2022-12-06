from app.seeds.subreddits import seed_subreddits
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subreddits import seed_subreddits, undo_subreddits
from .posts import seed_posts, undo_posts
from .members import seed_members, undo_members
from .comments import seed_comments, undo_comments
from .votes import seed_votes, undo_votes
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_subreddits()
    seed_posts()
    seed_members()
    seed_comments()
    seed_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_subreddits()
    undo_posts()
    undo_members()
    undo_comments()
    undo_votes()
    # Add other undo functions here
