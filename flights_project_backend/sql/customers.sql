
-- STORE PROCEDURE IN POSTGRESQL

-- customers table------------------------------------------------------

-- 1
-- get all customers 
create or replace function sp_get_all_customers()
returns setof customers
language plpgsql AS
    $$
        BEGIN
            return QUERY
            SELECT * from customers;
        END;
$$;

select * from sp_get_all_customers();



--2
-- get customer by id
create or replace function sp_get_customer_by_id(_id bigint)
returns setof customers
language plpgsql AS
    $$
    BEGIN
        return QUERY 
        SELECT * from customers
        WHERE id = _id;
    END;
$$;

--3
-- delet customer by id
create or replace function sp_delete_customer_by_id(_id bigint)
returns bigint
language plpgsql AS
    $$
        DECLARE
            rows_count int := 0;
        BEGIN
            WITH rows AS (
            DELETE FROM customers
            WHERE id = _id
            RETURNING 1)
            select count(*) into rows_count from rows;
            return rows_count;
        END;
$$


-- 4
--insert customer
create or replace function sp_insert_customer(_first_name text,_last_name text, _address text, _phone_no text, _card_no text, _user_id bigint)
returns bigint
language plpgsql AS
    $$
    declare
        new_id bigint;
    BEGIN
        INSERT into customers (first_name, last_name, address, phone_no, card_no, user_id)
        values (_first_name, _last_name, _address, _phone_no, _card_no, _user_id)
        returning id into new_id;
		return new_id;
    end;
$$

--5
-- update customer
create or replace function sp_update_customer(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _card_no text, _user_id bigint)
returns bigint
language plpgsql AS
    $$
    DECLARE
        rows_count int := 0;
    BEGIN
        WITH rows AS (
        UPDATE customers
        SET first_name = _first_name, last_name = _last_name, address = _address, phone_no = _phone_no, card_no = _card_no, user_id = _user_id WHERE id = _id
        RETURNING 1)
        select count(*) into rows_count from rows;
        return rows_count;
    END;
$$

--6
-- upsert customer
create or replace procedure sp_upsert_customrt(_id bigint, _first_name text, _last_name text, _address text, _phone_no text, _card_no text, _user_id bigint)
    language plpgsql as $$
    begin
        INSERT INTO users (first_name, last_name, address, phone_no, card_no, user_id)
        VALUES(_first_name, _last_name, _address, _phone_no, _card_no, _user_id)
        ON CONFLICT (first_name AND last_name)
        DO
        UPDATE SET username = _username;
    end;
$$;