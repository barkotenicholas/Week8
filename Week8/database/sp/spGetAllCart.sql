CREATE
OR ALTER PROCEDURE spGetAllCart @user_id VARCHAR(200) AS BEGIN
SELECT *
FROM Cart
WHERE user_id = @user_id
    AND isDeleted = 0;
END