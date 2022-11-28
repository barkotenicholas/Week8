CREATE OR ALTER PROCEDURE spGetAllProducts 
AS
    BEGIN
    SELECT * FROM Products WHERE isDeleted = 0;
    END