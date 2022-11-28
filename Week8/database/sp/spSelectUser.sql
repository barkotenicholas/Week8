CREATE OR ALTER PROCEDURE spSelectUser @email VARCHAR(100)
AS
    BEGIN
        SELECT * FROM Users WHERE email = @email AND isDeleted = 0
    END



