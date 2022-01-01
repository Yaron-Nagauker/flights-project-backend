
-- STORE PROCEDURE IN POSTGRESQL

-- flights table --------------------------------------------------------

-- 1
-- get all flights
create or replace function sp_get_all_flights()
returns setof flights
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from flights;
        END;
$$;

select * from sp_get_all_flights();


-- 2
-- get flihts by id
create or replace function sp_get_flights_by_id(_id bigint)
returns setof flights
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from flights
        WHERE id = _id;
    END;
$$;

select * from sp_get_flights_by_id(id);   


-- 3
-- delet airline by id
create or replace function sp_delete_flights_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        DELETE FROM flights
        WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

select * from  sp_delete_flights_by_id(_id bigint)

-- 4
-- insert new flight
create or replace function sp_insert_flight(_airline_id bigint, _origin_country_id integer,
 _dastination_country_id integer, _departure_time timestamp,
 _landing_time timestamp, _remaining_tickets integer )
returns bigint
language plpgsql AS
    $$ 
    declare
        new_id bigint;
    BEGIN
        INSERT into flights (airline_id, origin_country_id, dastination_country_id,
         departure_time, landing_time, remaining_tickets )
        values (_airline_id, _origin_country_id, _dastination_country_id,
         _departure_time, _landing_time, _remaining_tickets)
        returning id into new_id;
		
		return new_id;
    end;
$$


select * from sp_insert_flights(_airline_id bigint, _origin_country_id integer,
 _destination_country_id integer, _departure_time timestemp,
 _landing_time timestemp, _remaining_tickets integer)



-- 5
-- update flight by id
create or replace function sp_update_flight(_id bigint, _airline_id bigint, _origin_country_id integer,
 _destination_country_id integer, _departure_time timestamp,
 _landing_time timestamp, _remaining_tickets integer)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE flights
        SET airline_id = _airline_id, origin_country_id = _origin_country_id,
        destination_country_id = _destination_country_id, departure_time = _departure_time,
        landing_time = _landing_time, remaining_tickets = _remaining_tickets WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

select * from sp_update_flight(34, 7, 33, 39,'2021-01-02 18:00', '2021-01-02 21:15', 20)

-- 6
-- upsert flight ************
create or replace procedure sp_upsert_flight(_airline_id bigint)
    language plpgsql as $$
    begin
        INSERT INTO flights (airline_id)
        VALUES(_name)
        ON CONFLICT (name)
        DO
        UPDATE SET name = _name;
    end;
$$;

call sp_upsert_countries(_name)