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
                        $('#success').html("<div class='alert alert-success'><strong>Mensaje recibido!  Nos pondremos en contacto lo mas pronto posible.</strong></div>");
                        $('#contactForm').trigger('reset');

                        toastr.success("Mensaje recibido!  Nos pondremos en contacto lo mas pronto posible.");
                    }
                    else {
                        $('#success').html("<div class='alert alert-danger'>There is an error.</div>");
                        toastr.error("Mensaje no enviado.  Por favor intente de nuevo.");
                    }
                },
                error: function (retval) {
                    $('#success').html("<div class='alert alert-danger'>There is an error.</div>");
                    toastr.error("Mensaje no enviado.  Por favor intente de nuevo.");
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
