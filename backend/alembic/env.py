from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
from dotenv import load_dotenv
from app.database import Base
from app.models.user import User  # import all models to include in migrations


load_dotenv()  # Load .env so SUPABASE_DB_URL is available
from app.models.driver import Driver
from app.models.ride import Ride
from app.models.rating import Rating
from app.models.payment import Payment

# Alembic Config
config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

    target_metadata = Base.metadata

# Get database URL from .env
database_url = os.getenv("SUPABASE_DB_URL")

if not database_url:
    raise Exception("SUPABASE_DB_URL is missing from .env")

# Override alembic.ini URL with Supabase URL
config.set_main_option("sqlalchemy.url", database_url)

# IMPORTANT: Set correct metadata so Alembic sees tables
target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
