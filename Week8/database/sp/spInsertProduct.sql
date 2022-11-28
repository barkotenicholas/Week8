CREATE OR ALTER PROCEDURE spInsertProduct @id VARCHAR(200) , @name VARCHAR(200) , @description VARCHAR(200) , @imageurl VARCHAR(200) , @price INT , @discount INT
AS
    BEGIN
        INSERT INTO Products (id,name,decription,imageurl, price ,discount,isDeleted) VALUES ( @id , @name,@description,@imageurl,@price,@discount,0);
    END
