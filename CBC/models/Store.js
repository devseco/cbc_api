const mysql = require('../config/db');
class Store {

    static async DashUploadAds(id,image) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO stories_sliders (storeid, image) VALUES (?,?)';
            mysql.query(query, [id, image ], (error, result) => {
                if (!error) {
                    resolve('تم رفع الصورة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }

    static async DashUploadOffers(id,image) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO stories_offers (storeid, image) VALUES (?,?)';
            mysql.query(query, [id, image ], (error, result) => {
                if (!error) {
                    resolve('تم رفع الصورة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }

    static async DashUploadImages(id,image) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO stories_images (storeid, image) VALUES (?,?)';
            mysql.query(query, [id, image ], (error, result) => {
                if (!error) {
                    resolve('تم رفع الصورة بنجاح');
                }else{
                    resolve(error);
                }
            });
        });
    }

    static async DashAddBranches(id , title , phone , location) {   
        return new Promise(resolve => {
          const query = `INSERT INTO branches (title, storeid, phone, location, active) VALUES (?,?,?,?,?)`;
          mysql.query(query, [title , id , phone , location , 1 ], (error, result) => {
              if (!error) {
                  resolve('تمت الاضافة بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }

    static async DashUpdateStore(id, name, description, name_kur, category, city, facebook, instagram, telegram, whatsapp) {   
        return new Promise(resolve => {
            const query = `
                UPDATE stories
                SET name = ?, description = ?, name_kur = ?, category = ?, city = ?, facebook = ?, instagram = ?, telegram = ?, whatsapp = ?
                WHERE id = ?
            `;
            mysql.query(query, [name,description, name_kur, category, city, facebook, instagram, telegram, whatsapp, id], (error, result) => {
                if (!error) {
                    resolve('update successfully');
                } else {
                    console.error(error);
                }
            });
        });
    }

    static async addStore(name, logo, description, name_kur, category, city, facebook, instagram, telegram, whatsapp, images, offers, ads, branches , discounts) {
        return new Promise((resolve, reject) => {
            const storeQuery = 'INSERT INTO stories (name, logo, description, name_kur, category, city, active, facebook, instagram, telegram, whatsapp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            mysql.query(storeQuery, [name, logo, description, name_kur, category, city, 1, facebook, instagram, telegram, whatsapp], (error, storeResult) => {
                if (error) {
                    return reject(error);
                }                
                const storeId = storeResult.insertId;

                const DiscountQuery = 'INSERT INTO discount (store,discount,image,storeId,title) VALUES ?';
                let parsedDiscount;
                try {
                    parsedDiscount = JSON.parse(discounts);
                } catch (error) {
                    return reject('Error parsing branches JSON: ' + error.message);
                }
                if (!Array.isArray(parsedDiscount)) {
                    return reject('Branches data is not an array.');
                }
                const discountData = parsedDiscount.map(discount => [name, discount.discount, logo, storeId , discount.title]);

                mysql.query(DiscountQuery, [discountData], (discountError) => {
                    if (discountError) {
                        return reject(discountError);
                    }

    });



                
                const imagesQuery = 'INSERT INTO stories_images (storeid, image) VALUES ?';
                const imagesData = images.map(url => [storeId, url]);
                mysql.query(imagesQuery, [imagesData], (imagesError) => {
                    if (imagesError) {
                        return reject(imagesError);
                    }
                   
                    });
                    
                    const branchesQuery = 'INSERT INTO branches (title, storeid, phone, location, active) VALUES ?';
                            let parsedBranches;
                            try {
                                parsedBranches = JSON.parse(branches);
                            } catch (error) {
                                return reject('Error parsing branches JSON: ' + error.message);
                            }
                            if (!Array.isArray(parsedBranches)) {
                                return reject('Branches data is not an array.');
                            }
                            const branchesData = parsedBranches.map(branch => [branch.title, storeId, branch.phone, branch.location, 1]);
    
                            mysql.query(branchesQuery, [branchesData], (branchesError) => {
                                if (branchesError) {
                                    return reject(branchesError);
                                }

                });
                const offersQuery = 'INSERT INTO stories_offers (storeid, image) VALUES ?';
                const offersData = offers.map(url => [storeId, url]);
                mysql.query(offersQuery, [offersData], (offersError) => {
                    if (offersError) {
                        return reject(offersError);
                    }
                    });

               const adsQuery = 'INSERT INTO stories_sliders (storeid, image) VALUES ?';
               const adsData = ads.map(url => [storeId, url]);
                    mysql.query(adsQuery, [adsData], (adsError) => {
                        if (adsError) {
                            return reject(adsError);
                        }
                        });              

                resolve('Store and related data added successfully');
            });
        });
    }
    


    static GetAllStories(cate, city) {
        return new Promise((resolve, reject) => {
            const storiesQuery = `
            SELECT stories.*, IFNULL((SELECT MAX(IFNULL(discount, 0)) FROM discount WHERE storeId = stories.id), 0) AS discountCount FROM stories 
                WHERE stories.category = ? AND stories.city = ? 
                GROUP BY stories.id`;
            
            const imagesQuery = `
                SELECT image 
                FROM images_category 
                WHERE categoryid = ?`;
    
            mysql.query(storiesQuery, [cate, city], (error, storiesResults) => {
                if (error) {
                    reject(error);
                    return;
                }
    
                mysql.query(imagesQuery, [cate], (error, imagesResults) => {
                    if (error) {
                        reject(error);
                        return;
                    }
    
                    // Extract image URLs from the imagesResults
                    const images = imagesResults.map(imageRecord => imageRecord.image);
    
                    // Construct the final result structure
                    const result = {
                        stories: storiesResults,
                        Ads: images
                    };
    
                    resolve(result);
                });
            });
        });
    }
    
    static async DashGetAllStories(req, res, next) {
        return new Promise(resolve => {
            const query = `
                SELECT stories.*, categories.title AS category_name, cities.title AS city_name
                FROM stories
                JOIN categories ON stories.category = categories.id
                JOIN cities ON stories.city = cities.id
            `;
            mysql.query(query, [], (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    // يمكنك إضافة معالجة الخطأ هنا
                    console.error(error);
                }
            });
        });
    }
    
    
    //get by id
    static GetStoreByID(id) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT stories.*, categories.title AS categoryName
            FROM stories
            INNER JOIN categories ON stories.category = categories.id
            WHERE stories.id = ?;
            `;
            mysql.query(query, [id], (error, storeResults) => {
                if (error) {
                    resolve(error);
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


                        //
                        const slidersQuery = `
                        SELECT image
                        FROM stories_sliders
                        WHERE storeid = ?
                    `;

                    mysql.query(slidersQuery, [id], (error, slidersResults) => {
                        if (error) {
                            reject(error);
                        } else {
                            storeData.storeinfo.sliders = [];
                            slidersResults.forEach(sliderResult => {
                                storeData.storeinfo.sliders.push(sliderResult.image);
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
                        resolve(query);
                    }
                }
            });
        });
    }
    static searchStore(name) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM stories WHERE name LIKE ? ORDER BY id DESC';
          mysql.query(query, ['%' + name + '%'], (error, results) => {
            if (!error) {
              // تحويل النتائج إلى الشكل المطلوب
              const formattedResults = results.map((item) => {
                return {
                  'label': item.name, 
                  'value': item.id   
                };
              });
              resolve(formattedResults);
            } else {
              reject(error); // يجب التعامل مع الخطأ بشكل مناسب
            }
          });
        });
      }  


      static GetByFilter(cate, city, orderby) {
        return new Promise((resolve, reject) => {
            let orderByClause = '';
            if(orderby == 1){
                orderByClause = 'ORDER BY stories.id DESC';
            }else if(orderby == 2){
                orderByClause = 'ORDER BY stories.id ASC';
            }else if(orderby == 3){
                orderByClause = 'ORDER BY discountCount DESC';
            }else if(orderby == 4){
                orderByClause = 'ORDER BY discountCount ASC';
            }
           
            const storiesQuery = 'SELECT stories.*, IFNULL((SELECT MAX(IFNULL(discount, 0)) FROM discount WHERE storeId = stories.id), 0) AS discountCount FROM stories WHERE stories.category = ? AND stories.city = ? ' + orderByClause;

            const imagesQuery = `
                SELECT image 
                FROM images_category 
                WHERE categoryid = ?`;
    
            console.log('Executing storiesQuery:', storiesQuery); // اختبار: طباعة الاستعلام للتأكد منه
        
            mysql.query(storiesQuery, [cate, city], (error, storiesResults) => {
                if (error) {
                    reject(error);
                    return;
                }
    
                mysql.query(imagesQuery, [cate], (error, imagesResults) => {
                    if (error) {
                        reject(error);
                        return;
                    }
    
                    // Extract image URLs from the imagesResults
                    const images = imagesResults.map(imageRecord => imageRecord.image);
    
                    // Construct the final result structure
                    const result = {
                        stories: storiesResults,
                        Ads: images
                    };
    
                    resolve(result);
                });
            });
        });
    }
    
    static GetByFilterAllStories(orderby , city) {
        return new Promise((resolve, reject) => {
            let orderByClause = '';
            let orderByCity = '';
            if(orderby == 1){
                orderByClause = ' ORDER BY stories.id DESC ';
            }else if(orderby == 2){
                orderByClause = ' ORDER BY stories.id ASC ';
            }else if(orderby == 3){
                orderByClause = ' ORDER BY discountCount DESC ';
            }else if(orderby == 4){
                orderByClause = ' ORDER BY discountCount ASC ';
            }
            if(city > 0){
                orderByCity = ' where city = ' + city;
            }else{
                orderByCity = '';
            }
                
            const storiesQuery = 'SELECT stories.*, IFNULL((SELECT MAX(IFNULL(discount, 0)) FROM discount WHERE storeId = stories.id), 0) AS discountCount FROM stories   ' + orderByCity + orderByClause;
            
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
    
    static async DashDeleteStore(id) {   
          return new Promise(resolve => {
            const query = `DELETE FROM stories WHERE id = ?`;
            mysql.query(query, [id], (error, result) => {
                if (!error) {
                    resolve('تم الحذف بنجاح');
                } else {
                    console.error(error);
                }
            });
        });
    }
    static async DashDeleteAds(id , image ) {   
        return new Promise(resolve => {
          const query = `DELETE FROM stories_sliders WHERE image = ? AND storeid = ?`;
          mysql.query(query, [image , id], (error, result) => {
              if (!error) {
                  resolve('تم الحذف بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }

    //DashDeleteOffers
    static async DashDeleteOffers(id , image ) {   
        return new Promise(resolve => {
          const query = `DELETE FROM stories_offers WHERE image = ? AND storeid = ?`;
          mysql.query(query, [image , id], (error, result) => {
              if (!error) {
                  resolve('تم الحذف بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }

    static async DashDeleteImages(id , image ) {   
        return new Promise(resolve => {
          const query = `DELETE FROM stories_images WHERE image = ? AND storeid = ?`;
          mysql.query(query, [image , id], (error, result) => {
              if (!error) {
                  resolve('تم الحذف بنجاح');
              } else {
                  console.error(error);
              }
          });
      });
  }


}

module.exports = Store;
