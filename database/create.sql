CREATE DATABASE Software_Quiz;

USE Software_Quiz;

CREATE TABLE Quiz_Invite (
	id VARCHAR(36) default (uuid()) NOT NULL PRIMARY KEY,
    quiz_id VARCHAR(36) NOT NULL,
    email VARCHAR(320) NOT NULL
)

CREATE TABLE Quiz (
    quiz_id VARCHAR(36) NOT NULL PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL
)
