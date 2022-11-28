CREATE
OR ALTER PROCEDURE spInsertUpdateCart @userid VARCHAR(200),
@quantity INT,
@productid VARCHAR(200),
@productname VARCHAR(200),
@productdesc VARCHAR(200),
@productprice INT,
@productdiscount INT,
@product_imgurl VARCHAR(200) AS BEGIN IF EXISTS(
    SELECT *
    FROM Cart
    WHERE product_id = @productid AND user_id=@userid
) BEGIN
UPDATE Cart
SET quantity = @quantity , isDeleted =0
WHERE product_id = @productid
    AND user_id = @userid;
END
ELSE BEGIN
INSERT INTO Cart (
        user_id,
        quantity,
        product_id,
        product_name,
        product_desc,
        product_price,
        product_dicount,
        imageurl,
        isDeleted
    )
VALUES (
        @userid,
        @quantity,
        @productid,
        @productname,
        @productdesc,
        @productprice,
        @productdiscount,
        @product_imgurl,
        0
    )
END
END