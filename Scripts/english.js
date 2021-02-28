//------------------------------ $(function () { ------------------------------
$(function () {

    // ---------- SEND EMAIL ----------
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function ($form, event) {
            event.preventDefault();

            $this = $('#sendMessageButton');
            $this.prop('disabled', true);

            //var form_data = $("#contactForm").serialize();
            var postdata = {
                name: $("#name").val(),
                preferredmethod: $("#preferredmethod").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                message: $("#message").val()
            };

            $.ajax({
                type: "POST",
                url: "/Home/Send",
                data: postdata,
                success: function (retval) {
                    if (retval == "OK") {
                        $('#success').html("<div class='alert alert-success'><strong>Message received!  We will contact you as soon as possible.</strong></div>");
                        $('#contactForm').trigger('reset');

                        toastr.success("Message received!  We will contact you as soon as possible.");
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
                        $('#success').html('');
                    }, 5000);
                }
            });

        }
    });
    // ---------- end of SEND EMAIL ----------

});//------------------------------ end of $(function () { ------------------------------
