const mysql = require('../config/db')
class Product {

    static async getProducts(){
        return new Promise(resolve=>{
            mysql.query('select * from products', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getProductsRecently(){
        return new Promise(resolve=>{
            mysql.query('select * from products ORDER BY id DESC', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }

    static async searchProduct(title) {
    return new Promise(resolve => {
        const query = 'SELECT * FROM products WHERE title LIKE ? ORDER BY id DESC';
        mysql.query(query, ['%' + title + '%'], (error, result) => {
            if (!error) {
                resolve(result);
            }
        });
    });
}

static async getProduct(id) {
    return new Promise((resolve, reject) => {
        const productQuery = 'SELECT * FROM products WHERE id = ?';

        mysql.query(productQuery, [id], (productError, productResult) => {
            if (productError) {
                return reject(productError);
            }

            if (productResult.length === 0) {
                return resolve(null); // Return null if no product is found
            }

            const product = productResult[0];

            const imagesQuery = 'SELECT image FROM images_product WHERE productId = ?';
            mysql.query(imagesQuery, [id], (imagesError, imagesResult) => {
                if (imagesError) {
                    return reject(imagesError);
                }

                const images = imagesResult.map(row => row.image);
                product.images = images;

                resolve(product);
            });
        });
    });
}


    static async getProductByCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from products where category = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = Product;