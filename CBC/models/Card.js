const mysql = require('../config/db')
class Card {
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
    
}
module.exports = Card;