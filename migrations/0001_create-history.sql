-- Migration number: 0001 	 2024-07-09T02:31:36.913Z
DROP INDEX IF EXISTS id_history;
DROP TABLE IF EXISTS history;

CREATE TABLE history (
  id INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  image TEXT NOT NULL
);

CREATE INDEX id ON history (id);