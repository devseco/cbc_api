const mysql = require('../config/db')
class Card {
    static async addFeatures(title) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO card_features (title) VALUES (?)';
            mysql.query(query, [title], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }
    static async addDoing(title) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO card_doing (title) VALUES (?)';
            mysql.query(query, [title], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }
    static async addType(title , price) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO card_types (type , price) VALUES (? , ?)';
            mysql.query(query, [title , price], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }
    static async addOffer(title , price) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO card_offers (title , price) VALUES (? , ?)';
            mysql.query(query, [title , price], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }
    static async addSales(name , phone , city , image) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO card_sales (name , phone , city_id , image) VALUES (? , ? , ? , ?)';
            mysql.query(query, [name , phone , city , image], (error, result) => {
                if (!error) {
                    resolve('تمت الاضافة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }



    static async GetAllSales(){
        return new Promise(resolve=>{
            mysql.query('SELECT card_sales.*, cities.title AS city_title FROM card_sales JOIN cities ON card_sales.city_id = cities.id', [], (error, result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }



    static async getAboutCard() {
        return new Promise(resolve => {
            mysql.query('select * from card_about', [], (error1, result1) => {
                if (!error1) {
                    mysql.query('select * from card_doing', [], (error2, result2) => {
                        if (!error2) {
                            mysql.query('select * from card_features', [], (error3, result3) => {
                                if (!error3) {
                                    resolve({ about: result1, doing: result2, features: result3 });
                                } else {
                                    resolve({ about: result1, doing: result2, features: 'error' });
                                }
                            });
                        } else {
                            resolve({ about: result1, doing: 'error', features: 'error' });
                        }
                    });
                } else {
                    resolve('error');
                }
            });
        });
    }


    static async getTypeCard() {
        return new Promise(resolve => {
            mysql.query('select * from card_types', [], (error1, types) => {
                if (!error1) {
                    mysql.query('select * from card_offers', [], (error2, offers) => {
                        if (!error2) {
                            resolve({ type: types, offer: offers });
                        } else {
                            resolve({ about: result1, doing: 'error' });
                        }
                    });
                } else {
                    resolve('error');
                }
            });
        });
    }

    static async getSalesCard() {
        return new Promise(resolve => {
            // تعديل الاستعلام لإزالة الأعمدة غير المرغوب فيها
            mysql.query('SELECT cities.id, cities.title, GROUP_CONCAT(JSON_OBJECT("name", card_sales.name, "phone", card_sales.phone, "image", card_sales.image)) AS sales_info FROM cities JOIN card_sales ON cities.id = card_sales.city_id WHERE cities.active = 1 GROUP BY cities.id', [], (error, results, fields) => {
                if (error) {
                    return resolve('error');
                }
                
                // استعلام مستقل لجلب معلومات النظام من جدول card_about
                mysql.query('SELECT phone FROM card_about', [], (error, systemResults) => {
                    if (error) {
                        return resolve('error');
                    }
                    
                    // إنشاء الكائن النهائي للإرجاع
                    const finalResult = {
                        citiesWithSales: results.map(city => ({
                            id: city.id,
                            title: city.title,
                            sales_info: JSON.parse(`[${city.sales_info}]`) // تحويل النص إلى JSON
                        })),
                        systeminfo: { phone: systemResults[0].phone } // تحويل النتيجة إلى كائن
                    };
                    
                    resolve(finalResult);
                });
            });
        });
    }
}
module.exports = Card;