const mysql = require('../config/db');

class Store {
    static GetAllStories(cate, city) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT stories.*, discount.discount AS discountCount
                FROM stories 
                LEFT JOIN discount ON stories.id = discount.storeId 
                WHERE stories.category = ? AND stories.city = ? 
                GROUP BY stories.id`;
                
            mysql.query(query, [cate, city], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    //get by id
    static GetStoreByID(id) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT stories.*, stories_sliders.image, categories.title AS categoryName
            FROM stories
            INNER JOIN stories_sliders ON stories.id = stories_sliders.storeid
            INNER JOIN categories ON stories.category = categories.id
            WHERE stories.id = ?;
            `;
            mysql.query(query, [id], (error, storeResults) => {
                if (error) {
                    reject(error);
                } else {
                    if (storeResults.length > 0) {
                        const storeData = {
                            storeinfo: {
                                id: storeResults[0].id,
                                name: storeResults[0].name,
                                logo: storeResults[0].logo,
                                description: storeResults[0].description,
                                name_kur: storeResults[0].name_kur,
                                category: storeResults[0].category,
                                city: storeResults[0].city,
                                facebook: storeResults[0].facebook,
                                instagram: storeResults[0].instagram,
                                telegram: storeResults[0].telegram,
                                whatsapp: storeResults[0].whatsapp,
                                tektok: storeResults[0].tektok,
                                active: storeResults[0].active,
                                categoryName: storeResults[0].categoryName,
                                sliders: []
                            }
                        };

                        // تنظيم الصور في مصفوفة داخل الكائن
                        storeResults.forEach(result => {
                            storeData.storeinfo.sliders.push(result.image);
                        });

                        const branchesQuery = `
                        SELECT title, phone, location
                        FROM branches
                        WHERE storeid = ?
                      `;
                      mysql.query(branchesQuery, [id], (error, branchesResults) => {
                        if (error) {
                          reject(error);
                        } else {
                          storeData.storeinfo.branches = [];
                          branchesResults.forEach(branchResult => {
                            storeData.storeinfo.branches.push({
                              title: branchResult.title,
                              phone: branchResult.phone,
                              location: branchResult.location
                            });
                          });
                        }
                      });

                        // الآن سنقوم بجلب بيانات الصور من جدول "stories_images" ودمجها مع storeinfo
                        const imageQuery = `
                            SELECT image
                            FROM stories_images
                            WHERE storeid = ?
                        `;

                        
                        mysql.query(imageQuery, [id], (error, imageResults) => {
                            if (error) {
                                reject(error);
                            } else {
                                storeData.storeinfo.images = [];
                                imageResults.forEach(imageResult => {
                                    storeData.storeinfo.images.push(imageResult.image);
                                });

                                // الآن سنقوم بجلب بيانات العروض من جدول "stories_offers" ودمجها مع storeinfo
                                const offerQuery = `
                                    SELECT image
                                    FROM stories_offers
                                    WHERE storeid = ?
                                `;
                                mysql.query(offerQuery, [id], (error, offerResults) => {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        storeData.storeinfo.offers = [];
                                        offerResults.forEach(offerResult => {
                                            storeData.storeinfo.offers.push(offerResult.image);
                                        });
                                        // الآن سنقوم بجلب بيانات الخصم من جدول "discount" ودمجها مع storeinfo
                                        const discountQuery = `
                                            SELECT title, discount
                                            FROM discount
                                            WHERE storeId = ?
                                        `;
                                        mysql.query(discountQuery, [id], (error, discountResults) => {
                                            if (error) {
                                                reject(error);
                                            } else {
                                                storeData.storeinfo.discounts = [];
                                                discountResults.forEach(discountResult => {
                                                    storeData.storeinfo.discounts.push({
                                                        title: discountResult.title,
                                                        discount: discountResult.discount
                                                    });
                                                });
                                                resolve(storeData);
                                            }
                                        });
                                        
                                    }
                                });
                            }
                        });
                    } else {
                        // إذا لم يتم العثور على متجر مع الهوية المعطاة، نقوم بإرسال رسالة خطأ
                        resolve('Store not found');
                    }
                }
            });
        });
    }
}

module.exports = Store;
