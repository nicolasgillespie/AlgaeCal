$(document).ready(function() {

    $.ajax({
        url: "https://www.algaecal.com/wp-json/acf/v3/options/options",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function(resultData) {
            var result = resultData['acf'];

            // set phone number variable to update field
            var phone_number = result['default_phone_number'];
            var phone_number_link = 'tel:+' + phone_number.replaceAll('-', '');

            $('.phone_number').attr('href', phone_number_link).html(phone_number);

        },
        error : function(jqXHR, textStatus, errorThrown) {},

        timeout: 120000,
    });
});

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};
