/**
 * @author swamy kurakula
 */

var LS = {
    'set_data': function(item_name, item_value){
        if (typeof(Storage) !== "undefined") {
            if (item_name && item_value) {
                if (typeof(item_name) !== 'string') {
                    item_name = JSON.stringify(item_name);
                }
                if (typeof(item_value) !== 'string') {
                    item_value = JSON.stringify(item_value);
                }
                localStorage.setItem(item_name, item_value);
            }
            else {
                throw new Error('key & value are must not be empty');
            }
        }
        else {
            console.log('Oops...local storage not available');
        }
    },
    'get_data': function(item_name){
        if (item_name) {
            if (typeof(item_name) !== 'string') {
                item_name = JSON.stringify(item_name);
            }
            return localStorage.getItem(item_name);
        }
        else {
            throw new Error('key must not be empty');
        }
    },
    'remove_data': function(item_name){
        localStorage.removeItem(item_name);
    }
};
