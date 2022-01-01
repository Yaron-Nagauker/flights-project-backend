
-- STORE PROCEDURE IN POSTGRESQL
-------------------------------------------------------------------------
-- reset and delete data from ALL tables
create or replace procedure sp_delete_and_reset_all()
    language plpgsql as $$
    begin
        delete from tickets
        where id >= 1;
        alter sequence tickets_id_seq restart with 1;

        delete from flights
        where id >= 1;
        alter sequence flights_id_seq restart with 1;

        delete from airlines
        where id >= 1;
        alter sequence airlines_id_seq restart with 1;

        delete from customers
        where id >= 1;
        alter sequence customers_id_seq restart with 1;

        delete from countries
        where id >= 1;
        alter sequence countries_id_seq restart with 1;

        delete from users
        where id >= 1;
        alter sequence users_id_seq restart with 1;
    end;
$$;

call sp_delete_and_reset_all()


-------------------------------------------------------------------------
-------------------------------------------------------------------------
//username לפי join דוגמא ל 
select name, username, airlines.id as airline_id 
from airlines inner join users on users.id = airlines.user_id;


-- get airline by username -- עובד אבל לשפר
CREATE OR REPLACE FUNCTION get_airline_by_username(_username text) 
RETURNS TABLE(username text, name text, id bigint, country_id integer, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT u.username, a.name, a.id, a.country_id, a.user_id 
			from airlines AS a
            INNER JOIN users AS u on a.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;

select * from get_airline_by_username()


-- get customer by username -- עובד
CREATE OR REPLACE FUNCTION get_customer_by_username(_username text) 
RETURNS TABLE(username text, first_name text, last_name text, user_id bigint)
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT u.username, c.first_name, c.last_name, c.user_id
			from customers AS c
            INNER JOIN users AS u on c.user_id = u.id
			WHERE u.username = _username;
        END;
    $$;

select * from get_customer_by_username()


-- get user by username -- עובד
CREATE OR REPLACE FUNCTION get_user_by_username(_username text)
RETURNS SETOF users
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from users
        WHERE username = _username;
    END;
$$;

select * from get_user_by_username()


--get flights by parameters ** -- עובד
CREATE OR REPLACE FUNCTION get_flights_by_parameters(_origin_country_id integer, _destination_country_id integer, _date timestamp without time zone) 
RETURNS setof flights
    LANGUAGE plpgsql
    AS $$
        BEGIN
           RETURN QUERY
            SELECT * from flights
			Where origin_country_id = _origin_country_id 
			and destination_country_id = _destination_country_id 
			and departure_time = _date;
        END;
    $$;

select * from get_flights_by_parameters(8, 34, '2021-01-18 21:01:00')


-- get flights by airline id -- עובד 
CREATE OR REPLACE FUNCTION get_flights_by_airline_id(_airline_id bigint)
returns setof flights
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from flights
        WHERE airline_id = _airline_id;
    END;
$$;    

SELECT * FROM get_flights_by_airline_id(_airline_id bigint)


--get arrival flights

-- SQL דוגמא לחיפוש זמן ב 
-- cast שימוש ב 
-- לבדוק באינטרנט על הנושא
select * from flights
where departure_time > cast('2021-01-22 09:01:00' as timestamp);


-- טיסות הנוחתות ב 12 שעות האחרונות
SELECT * from flights
WHERE departure_time < cast('2021-02-05' as date)
AND departure_time > cast('2021-02-05' as date)
- cast( '12:00:00' as time);

-- עןבד
-- get arrival flights function -- in next 12 Hours
-- ! חדש db להחליף תאריכים כשמשתמשים ב
CREATE OR REPLACE FUNCTION get_arrival_flights()  
returns setof flights
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from flights
        WHERE landing_time < cast('2021-02-05 00:00:00' as CURRENT_TIMESTAMP)
        AND landing_time > cast('2021-02-05 00:00:00' as CURRENT_TIMESTAMP) - cast( '12:00' as time);
    END;
$$;

SELECT * FROM get_arrival_flights()


-- get departure flights -- in next 12 Hours
CREATE OR REPLACE FUNCTION get_departure_flights()  
returns setof flights
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from flights
        WHERE departure_time < cast('2021-02-05 00:00:00' as CURRENT_TIMESTAMP)
        AND departure_time > cast('2021-02-05 00:00:00' as CURRENT_TIMESTAMP) - cast( '12:00' as time);
    END;
$$;

SELECT * FROM get_departure_flights() 


-- get tickets by customer id
CREATE OR REPLACE function get_tickets_by_customer_id(_customer_id bigint)
returns setof tickets
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from tickets
        WHERE customer_id = customer_id;
    END;
$$; 

SELECT * FROM get_tickets_by_customer_id(_customer_id bigint)


------------------ extras ----------------------------------------------------

-- get flights by country id

CREATE OR REPLACE function get_flights_by_country_id(_customer_id bigint)
returns setof 
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from 
        WHERE customer_id = customer_id;
    END;
$$; 



-- get remaining tickets by flight id
CREATE OR REPLACE function get_remaining_tickets_by_flight_id(_customer_id bigint)
returns setof 
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from 
        WHERE customer_id = customer_id;
    END;
$$; 

// auth user ****
CREATE OR REPLACE function sp_auth_user(_mail text, _pass text)
returns setof users
LANGUAGE plpgsql
AS $$
    BEGIN
        RETURN QUERY
        SELECT * from users
        WHERE email = mail, password = _pass;
    END;
$$; 


-- 