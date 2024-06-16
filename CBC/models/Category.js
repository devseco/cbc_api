const mysql = require('../config/db')

class Category {

    static GetByFilterAllCategories(orderby, city) {
        return new Promise((resolve, reject) => {
            let orderByClause = '';
            let orderByCity = '';
            if (orderby == 1) {
                orderByClause = ' ORDER BY id DESC ';
            } else if (orderby == 2) {
                orderByClause = ' ORDER BY id ASC ';
            }
    
            if (city > 0) {
                orderByCity = ' WHERE city = ' + city;
            } else {
                orderByCity = '';
            }
    
            const storiesQuery = `
                SELECT 
                    categories.*, 
                    IFNULL(cities.title, '') AS city_title  
                FROM 
                    categories 
                LEFT JOIN 
                    cities 
                ON 
                    categories.city = cities.id
                ${orderByCity}
                ${orderByClause}
            `;
    
            mysql.query(storiesQuery, [], (error, storiesResults) => {
                if (error) {
                    reject(error);
                    return;
                }
                const result = storiesResults;
                resolve(result);
            });
        });
    }
    
    

    static async addCategory(title, image ,city) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO categories (title, image , city , active) VALUES (? , ? , ? , 1)';
            mysql.query(query, [title, image , city ], (error, result) => {
                if (!error) {
                    resolve('add Successfully');
                }else{
                    resolve(error);
                }
            });
        });
    }

    static async GetAllCategories(){
        return new Promise(resolve=>{
            mysql.query('SELECT categories.*, cities.title AS city_title FROM categories JOIN cities ON categories.city = cities.id', [], (error, result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    

    static async GetCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from categories where city = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    
    static async DashDeleteCategory(id) {   
        return new Promise(resolve => {
          const query = `DELETE FROM categories WHERE id = ?`;
          mysql.query(query, [id], (error, result) => {
              if (!error) {
                  resolve('تم الحذف بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }
  static async DashGetCategory(id){
    return new Promise(resolve=>{
        mysql.query('SELECT categories.*, cities.title AS city_title FROM categories JOIN cities ON categories.city = cities.id  WHERE categories.id = ?' , [id], (error , result)=>{
            if(!error){
                resolve(result);
            }
        });
    })
}
static async DashGetSlider(){
    return new Promise(resolve=>{
        mysql.query('SELECT images_category.image ,images_category.id, categories.title AS category_title, cities.title AS city_title FROM images_category JOIN categories ON images_category.categoryId = categories.id JOIN cities ON categories.city = cities.id;' , [], (error , result)=>{
            if(!error){
                resolve(result);
            }else{
                resolve(error);
            }
        });
    })
}

static async UpdateCategory(title , id , city) {
    return new Promise((resolve) => {
        const query = 'UPDATE categories SET title = ? , city = ? WHERE id = ?';
        mysql.query(query, [title, city, id], (error, result) => {
            if (!error) {
                resolve('تم حفظ التعديلات');
            } else {
                resolve(error);
            }
        });
    });
}


static async UpdateImageCategory(image, id) {
    return new Promise((resolve) => {
        const query = 'UPDATE categories SET image = ? WHERE id = ?';
        mysql.query(query, [image,id], (error, result) => {
            if (!error) {
                resolve('Update Successfully');
            } else {
                resolve(error);
            }
        });
    });
}

static async DashAddSlider(id, image) {
    return new Promise((resolve) => {
        const query = 'INSERT INTO images_category (categoryId,image) VALUES (? , ?)';
        mysql.query(query, [id, image ], (error, result) => {
            if (!error) {
                resolve('تمت الاضافة بنجاح');
            }else{
                resolve(error);
            }
        });
    });
}
static async DashDeleteSlider(id) {   
    return new Promise(resolve => {
      const query = `DELETE FROM images_category WHERE id = ?`;
      mysql.query(query, [id], (error, result) => {
          if (!error) {
              resolve('تم الحذف بنجاح');
          } else {
              console.error(error);
          }
      });
  });
}

}
module.exports = Category;