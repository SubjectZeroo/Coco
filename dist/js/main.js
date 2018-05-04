$('document').ready(function() {

    getRatesFromDatabase();

    $(document).on("click", "#signUp", function() {
        registrar();
    });

    $(document).on("click", "#logIn", function() {
        ingresar();
    });

    $(document).on("keyup mouseup", "#cantidadC", function() {

        validateAmountToChange();
        moneyToSendAndReceive();
    });

    $(document).on("submit", "#quoteForm", function() {
        event.preventDefault();
        console.log("> ... Pulsado: Boton submit in Quote Form");
    });
});

// TODO: Implementar UX que implique mostrar al usuario que no se permiten valores menores a 0
function validateAmountToChange() {
    var amount = $("#cantidadC"),
        valid = false;

    if (Number(amount.val()) <= 0) {
        console.log("> ... Error: No se permiten valores menores a 0");
        amount.val(1);
    }
}

function moneyToSendAndReceive() {
    var currentRate = Number(sessionStorage.getItem("currentRate")),
        percentageFees = Number((sessionStorage.getItem("percentageFees") / 100)).toFixed(3),
        dolarFees = Number(sessionStorage.getItem("dolarFees"));

    var amountToChange = Number($("#cantidadC").val()),
        feesPaypal = roundToTwo((amountToChange * percentageFees) + dolarFees),
        weReceive = roundToTwo(amountToChange - feesPaypal),
        youGet = roundToTwo(weReceive * currentRate);

    $("#comisionP").val(feesPaypal);
    $("#nuestraC").val(weReceive);
    $("#total").val(youGet);

    console.log("> ... Rates: " + amountToChange + " " + feesPaypal + " " + weReceive + " " + youGet);
    console.log("> ... Rates: " + currentRate + " " + percentageFees + " " + dolarFees);
}

function getRatesFromDatabase() {
    firebase
        .database()
        .ref("currentAmounts")
        .on("value", function(data) {
            console.log(data.val());
            setCurrentRates(data.val());
        });
}

function setCurrentRates(data) {
    sessionStorage.setItem("currentRate", data.currentRate);
    sessionStorage.setItem("percentageFees", data.percentageFees);
    sessionStorage.setItem("dolarFees", data.dolarFees);

    $("#currentRate")
        .empty()
        .html(sessionStorage.getItem("currentRate"));
}

/**
 * https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
 * @param {*} num 
 */
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}