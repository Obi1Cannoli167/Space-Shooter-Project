DROP DATABASE IF EXISTS SpaceDB;
CREATE DATABASE SpaceDB;
USE SpaceDB;

create table players (
    player_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT INDEXED,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(30) NOT NULL
);

create table scores (
    score_id INT NOT NULL PRIMARY KEY,
    play_date DATETIME NOT NULL,
    score INT NOT NULL,
    playtime INT NOT NULL,
    player_id INT NOT NULL,
    username VARCHAR(30) NOT NULL,
    Foreign Key (player_id) REFERENCES players(player_id),
    Foreign Key (username) REFERENCES players(username)
);