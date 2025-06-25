"use strict";

var KTUsersList = function () {
    var e, t, n, r;
    var o = document.getElementById("kt_table_users");

    const initDataTable = () => {
        if (!$.fn.DataTable.isDataTable(o)) {
            e = $(o).DataTable({
                info: false,
                order: [],
                pageLength: 10,
                lengthChange: false,
                columnDefs: [
                    { orderable: false, targets: 0 },
                    { orderable: false, targets: 6 }
                ]
            });

            e.on("draw", function () {
                updateToolbarStates();
                handleDeleteButtons();
                handleSelection();
            });
        }
    };

    const handleDeleteButtons = () => {
        o.querySelectorAll('[data-kt-users-table-filter="delete_row"]').forEach(t => {
            t.addEventListener("click", function (t) {
                t.preventDefault();
                const row = t.target.closest("tr");
                const name = row.querySelectorAll("td")[1].querySelectorAll("a")[1].innerText;

                Swal.fire({
                    text: "Are you sure you want to delete " + name + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + name + "!",
                            icon: "success",
                            confirmButtonText: "Ok, got it!",
                            buttonsStyling: false,
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary"
                            }
                        }).then(() => {
                            e.row($(row)).remove().draw();
                        }).then(updateToolbarStates);
                    }
                });
            });
        });
    };

    const handleSelection = () => {
        const checkboxes = o.querySelectorAll('[type="checkbox"]');
        t = document.querySelector('[data-kt-user-table-toolbar="base"]');
        n = document.querySelector('[data-kt-user-table-toolbar="selected"]');
        r = document.querySelector('[data-kt-user-table-select="selected_count"]');

        const deleteBtn = document.querySelector('[data-kt-user-table-select="delete_selected"]');

        checkboxes.forEach(cb => {
            cb.addEventListener("click", () => {
                setTimeout(updateToolbarStates, 50);
            });
        });

        deleteBtn.addEventListener("click", () => {
            Swal.fire({
                text: "Are you sure you want to delete selected customers?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then(result => {
                if (result.value) {
                    Swal.fire({
                        text: "You have deleted all selected customers.",
                        icon: "success",
                        confirmButtonText: "Ok, got it!",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary"
                        }
                    }).then(() => {
                        checkboxes.forEach(cb => {
                            if (cb.checked) {
                                e.row($(cb.closest("tbody tr"))).remove().draw();
                            }
                        });
                        o.querySelectorAll('[type="checkbox"]')[0].checked = false;
                    }).then(() => {
                        updateToolbarStates();
                        handleSelection();
                    });
                }
            });
        });
    };

    const updateToolbarStates = () => {
        const checkboxes = o.querySelectorAll('tbody [type="checkbox"]');
        let selectedCount = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) selectedCount++;
        });

        if (selectedCount > 0) {
            r.innerHTML = selectedCount;
            t.classList.add("d-none");
            n.classList.remove("d-none");
        } else {
            t.classList.remove("d-none");
            n.classList.add("d-none");
        }
    };

    return {
        init: function () {
            if (!o) return;

            // טיפול במיון תאריכים
            o.querySelectorAll("tbody tr").forEach(row => {
                const tds = row.querySelectorAll("td");
                const ageText = tds[3].innerText.toLowerCase();
                let amount = 0;
                let unit = "minutes";

                if (ageText.includes("yesterday")) {
                    amount = 1;
                    unit = "days";
                } else if (ageText.includes("mins")) {
                    amount = parseInt(ageText.replace(/\D/g, ""));
                    unit = "minutes";
                } else if (ageText.includes("hours")) {
                    amount = parseInt(ageText.replace(/\D/g, ""));
                    unit = "hours";
                } else if (ageText.includes("days")) {
                    amount = parseInt(ageText.replace(/\D/g, ""));
                    unit = "days";
                } else if (ageText.includes("weeks")) {
                    amount = parseInt(ageText.replace(/\D/g, ""));
                    unit = "weeks";
                }

                const timestamp = moment().subtract(amount, unit).format();
                tds[3].setAttribute("data-order", timestamp);

                const dateCell = moment(tds[5].innerHTML, "DD MMM YYYY, LT").format();
                tds[5].setAttribute("data-order", dateCell);
            });

            // הפעלת הדאטאטייבל רק אם לא מאותחל
            initDataTable();

            // חיפוש
            document.querySelector('[data-kt-user-table-filter="search"]').addEventListener("keyup", function (t) {
                e.search(t.target.value).draw();
            });

            // איפוס
            document.querySelector('[data-kt-user-table-filter="reset"]').addEventListener("click", function () {
                document.querySelector('[data-kt-user-table-filter="form"]').querySelectorAll("select").forEach(el => {
                    $(el).val("").trigger("change");
                });
                e.search("").draw();
            });

            // סינון בטופס
            (function () {
                const filterBtn = document.querySelector('[data-kt-user-table-filter="filter"]');
                const selects = document.querySelectorAll('[data-kt-user-table-filter="form"] select');

                filterBtn.addEventListener("click", function () {
                    let searchString = "";
                    selects.forEach((el, i) => {
                        if (el.value && el.value !== "") {
                            if (i > 0) searchString += " ";
                            searchString += el.value;
                        }
                    });
                    e.search(searchString).draw();
                });
            })();
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTUsersList.init();
});
