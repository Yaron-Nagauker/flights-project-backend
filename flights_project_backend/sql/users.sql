
-- STORE PROCEDURE IN POSTGRESQL

-- users table --------------------------------------------------------

-- 1
-- get all users
create or replace function sp_get_all_users()
returns setof users
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from users;
        END;
$$;

select * from sp_get_all_users();

-- 2
-- get user by id
create or replace function sp_get_user_by_id(_id bigint)
returns setof users
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from users
        WHERE id = _id;
    END;
$$;

select * from sp_get_users_by_id(id); 

-- 3
-- delet user by id
create or replace function sp_delete_user_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM users
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$

select * from  sp_delete_users_by_id(_id bigint)

-- 4
-- insert new user 
create or replace function sp_insert_user(_username text, _password text, _email text)
returns bigint
language plpgsql AS
    $$
    declare
        new_id bigint;
    BEGIN
        INSERT into users (username, password, email)
        values (_username, _password, _email)
        returning id into new_id;
		
		return new_id;
    end;
$$

select * from sp_insert_user()


-- 5
-- update user 
create or replace function sp_update_user(_id bigint, _username text, _password text, _email text)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE users
        SET username = _username, password = _password, email = _email WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

SELECT * FROM sp_update_user()


-- 6
-- upsert user
create or replace procedure sp_upsert_user(_username text, _password text, _email text)
    language plpgsql as $$
    begin
        INSERT INTO users (username, password, email)
        VALUES(_username, _password, _email)
        ON CONFLICT (username)
        DO
        UPDATE SET username = _username;
    end;
$$;

call sp_upsert_user()