
-- STORE PROCEDURE IN POSTGRESQL

-- countries table --------------------------------------------------------

-- 1
-- get all countries
create or replace function sp_get_all_countries()
returns setof countries
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from countries;
        END;
$$;

select * from sp_get_all_countries();

-- 2
-- get cuontry by id
create or replace function sp_get_country_by_id(_id bigint)
returns setof countries
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from countries
        WHERE id = _id;
    END;
$$;

select * from sp_get_country_by_id(id);

-- 3
-- delete country by id
create or replace function sp_delete_country_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        DELETE FROM countries
        WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

select * from  sp_delete_countries_by_id()


-- 4
-- insert new Country
create or replace function sp_insert_country(_name text)
returns bigint
language plpgsql AS
    $$
    declare
        new_id bigint;
    BEGIN
        INSERT into countries (name)
        values (_name)
        returning id into new_id;
		return new_id;
    end;
$$

SELECT * from sp_insert_country()


-- 5
-- update country name
create or replace function sp_update_country(_id bigint, _name text)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE countries
        SET name = _name WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

SELECT * FROM sp_update_country()


-- 6
-- upsert countries ******* 
create or replace procedure sp_upsert_country(_name)
    language plpgsql as $$
    begin
        INSERT INTO countries (name)
        VALUES(_name)
        ON CONFLICT (name)
        DO
        UPDATE SET name = _name;
    end;
$$;

call sp_upsert_country(_name)