
-- STORE PROCEDURE IN POSTGRESQL

-- tickets table --------------------------------------------------------

-- 1
-- get all tickets
create or replace function sp_get_all_tickets()
returns setof tickets
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from tickets;
        END;
$$;

select * from sp_get_all_tickets();

-- 2
-- get tickets by id/ flight_id
create or replace function sp_get_tickets_by_id(_id bigint)
returns setof tickets
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from tickets
        WHERE id = _id;
    END;
$$;

select * from sp_get_tickets_by_id(id);

-- 3
-- delete ticket by id
create or replace function sp_delete_tickets_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM tickets
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$

select * from  sp_delete_tickets_by_id(_id bigint)


-- 4
-- insert new tickets 
create or replace function sp_insert_tickets(_flight_id bigint, _customer_id bigint)
returns bigint
language plpgsql AS
    $$
    declare
        new_id bigint;
    BEGIN
        INSERT into tickets (flight_id, customer_id)
        values (_flight_id, _customer_id)
        returning id into new_id;
		
		return new_id;
    end;
$$

select * from sp_insert_tickets()


-- 5
-- update tickets 
create or replace function sp_update_tickets(_id bigint, _flight_id bigint, _customr_id bigint)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE tickets
        SET flight_id = _flight_id, customr_id = _customr_id WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

-- 6
--upsert ticket 
create or replace function sp_upsert_tickets(_flight_id, _customr_id)
        language plpgsql as 
        $$
        begin
        INSERT INTO tickets (flight_id, customr_id)
        VALUES(_flight_id, _customr_id)
        ON CONFLICT (flight_id)
        DO
        UPDATE SET flight_id = _flight_id, customr_id = _customr_id;
    end;
$$;