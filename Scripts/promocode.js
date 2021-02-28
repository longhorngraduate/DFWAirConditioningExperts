//------------------------------ $(function () { ------------------------------
$(function () {

    //'use strict';


    // ---------- SEND EMAIL ----------
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function ($form, event) {
            event.preventDefault();

            $this = $('#sendMessageButton');
            $this.prop('disabled', true);

            //var form_data = $("#promocodeForm").serialize();
            var postdata = {
                name: $("#name").val(),
                preferredmethod: $("#preferredmethod").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                message: $("#message").val()
            };

            $.ajax({
                type: "POST",
                url: "/Home/GetPromoCode",
                data: postdata,
                success: function (retval) {
                    if (retval == "OK") {
                        $('#success').html("<div class='alert alert-success'>Promo Code: <strong>WINTER2021</strong><br /><br />We have marked you down for our promotion! Someone from our staff will contact you as soon as they're free.</div>");
                        //We hope to have the pleasure of doing business with you in the near future.See you soon!
                        $('#promocodeForm').trigger('reset');

                        toastr.success("Welcome! Below is your Promo Code.");
                    }
                    else {
                        $('#success').html("<div class='alert alert-danger'>There is an error.</div>");
                        toastr.error("Message not sent.  Please try again later.");
                    }
                },
                error: function (retval) {
                    $('#success').html("<div class='alert alert-danger'>There is an error.</div>");
                    toastr.error("Message not sent.  Please try again later.");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                        //$('#success').html('');
                    }, 5000);
                }
            });

        }
    });
    // ---------- end of SEND EMAIL ----------

});//------------------------------ end of $(function () { ------------------------------
