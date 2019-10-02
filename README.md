# project2

Steps to get started:

Update config/config.json with SQL info, user/password

Create DB:
-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS youtils_DB;
-- Creates the "blogger" database --
CREATE DATABASE youtils_DB;

USE youtils_DB;


Send a POST to /api/load/utils & /api/load/users
- This will load the DB with data
