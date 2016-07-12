/**
 * PaginationJS
 * @author swamy kurakula <siva.kurkula1@gmail.com>
 *
 * A lightweight pagination plugin
 */


/**
 * Moves to previous data on left button click
 * @param {array} rows
 * @param {int} startRange
 * @param {int} pageHitCount
 * @returns {array} a reference to the previous data to display
 *
 */

function onLeft(rows, startRange, pageHitCount){
    var rowsToRender = [];
    if (startRange >= 0 && pageHitCount > 0) {
        rowsToRender = read_rows(rows, startRange, pageHitCount);
        $('#pg-right').prop('disabled', false);
        if (startRange === 0)
            $('#pg-left').prop('disabled', true);
    }
    else {
        $('#pg-left').prop('disabled', true);
    }
    return rowsToRender;
}

/**
 * Moves to next data on right button click
 * @param {array} rows
 * @param {int} startRange
 * @param {int} pageHitCount
 * @returns {array} a reference to the next data to display
 *
 */

function onRight(rows, startRange, pageHitCount){
    var rowsToRender = [];
    if (startRange > 0 && pageHitCount > 0) {
        rowsToRender = read_rows(rows, startRange, pageHitCount);
        if (rowsToRender.length && rowsToRender.length === 50) 
            $('#pg-left').prop('disabled', false);
        else 
            if (rowsToRender.length && rowsToRender.length < 50){
				$('#pg-left').prop('disabled', false);
				$('#pg-right').prop('disabled', true);
			}
                
    }
    return rowsToRender;
}

/**
 * Processes and verifies conditions , read data if found
 * @param {array} rows
 * @param {int} startRange
 * @param {int} pgHitCnt
 * @returns {array} a reference to the data to display
 *
 */

function read_rows(rows, startRange, pgHitCnt){

    if (rows.constructor === Array && !rows.length) 
        return [];
    
    if (startRange < 0) 
        throw new Error('Starting index of array must be between limits(0 and array.length)');
    
    if (pgHitCnt <= 0) 
        throw new Error('pageCount must be greather than or equal to 1');
    
    var endRange = (pgHitCnt * 50) - 1;
    
    if (startRange > endRange) 
        throw new Error('start index of array must be less than array.size-1');
    
    var expected_rows = [];
    //in any case , from here pgHitCnt is starting 1
    if (endRange <= rows.length) {
        for (var i = startRange; i <= endRange; i++) {
            expected_rows.push(rows[i]);
        }
    }
    else {
        for (var i = startRange; i < rows.length; i++) {
            expected_rows.push(rows[i]);
        }
    }
    return expected_rows;
}
