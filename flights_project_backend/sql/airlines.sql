
-- STORE PROCEDURE IN POSTGRESQL

-- airlines table------------------------------------------------

-- 1
-- get all airlines
create or replace function sp_get_all_airlines()
returns setof airlines
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from airlines;
        END;
$$;

select * from sp_get_all_airlines();


-- 2
-- get airline by id
create or replace function sp_get_airline_by_id(_id bigint)
returns setof airlines
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from airlines
        WHERE id = _id;
    END;
$$;

select * from sp_get_airline_by_id(id);   


-- 3
-- delet airline by id
create or replace function sp_delete_airline_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM airlines
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$

select * from  sp_delete_airline_by_id()


-- 4
-- insert new airline 
create or replace function sp_insert_airline(_name text, _country_id int, _user_id bigint)
returns bigint
language plpgsql AS
    $$
    declare
        new_id bigint;
    BEGIN
        INSERT into airlines (name, country_id, user_id)
        values (_name, _country_id, _user_id)
        returning id into new_id;
		
		return new_id;
    end;
$$

select * from sp_insert_airline()


-- 5
-- update airline by id
create or replace function sp_update_airline(_id bigint, _name text, _country_id int, _user_id bigint)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE airlines
        SET name = _name, country_id = _country_id, user_id = _user_id WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

select * from sp_update_airline()

-- 6
-- upsert airline
create or replace procedure sp_upsert_airlines(_name text, _country_id int, _user_id bigint)
        language plpgsql as $$
    begin
        INSERT INTO airlines (name, country_id, user_id)
        VALUES(_name, _country_id, _user_id)
        ON CONFLICT (name)
        DO
        UPDATE SET name = _name, country_id = _country_id, user_id = _user_id;
    end;
$$;