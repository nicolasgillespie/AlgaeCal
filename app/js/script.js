$(document).ready(function() {
    var date = new Date();
    var year = date.getFullYear();

    // Update copyright year
    if($('.year').length) {
        $('.year').html(year);
    }

    // Ajax call to algaecal options for data
    $.ajax({
        url: "https://www.algaecal.com/wp-json/acf/v3/options/options",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
            var result = resultData['acf'];
            console.log(result)

            // set phone number variables to update phone number field
            var phone_number = result['default_phone_number'];
            var phone_number_link = 'tel:+' + phone_number.replaceAll('-', '');

            $('.phone_number').attr('href', phone_number_link).html(phone_number);

            // verify if time is within office hours to show or hide message
            var office_hours = result['office_hours'];

            // set date variables
            var day = date.getDay();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var current_time = hours + '' + minutes;

            // Get start and close times
            var starting_time = office_hours[day].starting_time;
            var closing_time = office_hours[day].closing_time;

            // verify if office if open and hide message if not
            if(current_time > starting_time && current_time < closing_time) {
                $('.office_hours').show();
            } else {
                $('.office_hours').hide();
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {},

        timeout: 120000,
    });
});

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};
