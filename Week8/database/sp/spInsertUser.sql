CREATE OR ALTER PROCEDURE spInsertUser @id VARCHAR(200) , @firstname VARCHAR(200),@lastname VARCHAR(200), @email VARCHAR(200),@password VARCHAR(200)
AS
    BEGIN
        INSERT INTO Users ( id , firstname , lastname ,email ,password , isDeleted) VALUES ( @id , @firstname ,@lastname ,@email,@password ,0 );
    END    