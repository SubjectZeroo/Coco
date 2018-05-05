$('document').ready(function() {

    observador();

    getRatesFromDatabase();

    $(document).on("click", "#signOut", function() {
        logout();
    });

    $(document).on("submit", "#formulario", function() {
        event.preventDefault();

        getFormData();

        return false;
    });
});

function getFormData() {
    var form = document.getElementById("formulario");
    var isValidForm = form.checkValidity();

    if (isValidForm) {
        var currentRate = Number(document.getElementById("currentRate").value);
        var percentageFees = Number(document.getElementById("percentageFees").value);
        var dolarFees = Number(document.getElementById("dolarFees").value);

        console.log("> ... Data: " + currentRate + ", " + percentageFees + ", " + dolarFees);

        var Amounts = { currentRate: currentRate, percentageFees: percentageFees, dolarFees: dolarFees, update_at: new Date() };

        saveRates(Amounts);
    }
}

function getRatesFromDatabase() {
    firebase
        .database()
        .ref("currentAmounts")
        .on("value", function(data) {
            // console.log(data.val());
            setCurrentRates(data.val());
            showCurrentRates();
        });
};

function setCurrentRates(data) {

    sessionStorage.setItem('currentRate', data.currentRate);
    sessionStorage.setItem('percentageFees', data.percentageFees);
    sessionStorage.setItem('dolarFees', data.dolarFees);

}

function showCurrentRates() {

    var currentRate = sessionStorage.getItem("currentRate");
    var percentageFees = sessionStorage.getItem("percentageFees");
    var dolarFees = sessionStorage.getItem("dolarFees");
    //
    document.getElementById("currentRate").value = currentRate;
    document.getElementById("percentageFees").value = percentageFees;
    document.getElementById("dolarFees").value = dolarFees;
    //
    $("#tableCurrentRate").empty().append(currentRate);
    $("#tablePercentageFees").empty().append(percentageFees);
    $("#tableDolarFees").empty().append(dolarFees);
}


// Guardar datos 
function saveRates(Amounts) {
    firebase
        .database()
        .ref("currentAmounts/")
        .update(Amounts);
}

function writeNewUpdate() {

    firebase.database()
        .ref('data/' + user.uid)
        .set(usuario);

}