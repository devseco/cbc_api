const mysql = require('../config/db')
class Slider {
    static GetAllSliders(){
        return new Promise(resolve=>{
            mysql.query('select * from sliders' , [],(e,r)=>{
                if(!e)
                resolve(r)
            });
        })
    }
    static async addSlider(title, image ) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO sliders (title, image) VALUES (?,?)';
            mysql.query(query, [title, image], (error, result) => {
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
          const query = `DELETE FROM sliders WHERE id = ?`;
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
module.exports = Slider