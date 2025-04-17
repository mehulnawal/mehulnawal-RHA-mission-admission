let menuIcon = document.getElementById("menu-icon");
let toggleIcon = document.getElementById("toggleIcon");
let faXmark = document.getElementById("faXmark");
let body = document.getElementsByTagName("body");

menuIcon.addEventListener("click", function () {
    toggleIcon.classList.add("toggleIcon-Toggle");
    // body.classList.add("bodyToggle")

});

faXmark.addEventListener("click", function () {
    toggleIcon.classList.remove("toggleIcon-Toggle");
    // body.classList.remove("bodyToggle")
});

document.addEventListener('DOMContentLoaded', function () {
    // Student boxes functionality
    const studentBoxes = document.querySelectorAll('.noOfStdBox');
    const studentCount = document.getElementById('studentCount');

    // Initially show only first student box (default value 1)
    for (let i = 0; i < studentBoxes.length; i++) {
        if (i > 0) {
            studentBoxes[i].style.display = 'none';
        }
    }

    // Show boxes based on selection
    studentCount.addEventListener('change', function () {
        const count = parseInt(this.value);

        studentBoxes.forEach((box, index) => {
            if (index < count) {
                box.style.display = '';
            } else {
                box.style.display = 'none';
            }
        });

        // Update active state
        updateActiveState(0);
    });

    // Add click event for each student box
    studentBoxes.forEach((box, index) => {
        box.addEventListener('click', function () {
            updateActiveState(index);
            // Update the heading
            document.querySelector('h6.text-center.my-3.fs-5').textContent = `Student ${index + 1} to ${studentCount.value}`;
        });
    });

    function updateActiveState(activeIndex) {
        studentBoxes.forEach((box, idx) => {
            if (idx === activeIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Student boxes functionality
    const studentBoxes = document.querySelectorAll('.noOfStdBox');
    const studentCount = document.getElementById('studentCount');
    const previousBtn = document.querySelector('.btn-danger');  // Previous button
    const nextBtn = document.querySelector('.btn-success');     // Next button
    const studentFormsContainer = document.getElementById('studentForms');
    const statusHeading = document.querySelector('h6.text-center.my-3.fs-5');

    let currentStudentIndex = 0;  // Track current student

    // Initially hide Previous and Next buttons if only 1 student
    updateNavigationButtons();

    // Show boxes based on selection
    studentCount.addEventListener('change', function () {
        const count = parseInt(this.value);

        studentBoxes.forEach((box, index) => {
            if (index < count) {
                box.style.display = '';
            } else {
                box.style.display = 'none';
            }
        });

        // Reset to first student
        currentStudentIndex = 0;
        updateActiveState(currentStudentIndex);
        updateNavigationButtons();
        updateStatusHeading();
    });

    // Add click event for each student box
    studentBoxes.forEach((box, index) => {
        box.addEventListener('click', function () {
            currentStudentIndex = index;
            updateActiveState(currentStudentIndex);
            updateNavigationButtons();
            updateStatusHeading();
        });
    });

    // Previous button click event
    previousBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentStudentIndex > 0) {
            currentStudentIndex--;
            updateActiveState(currentStudentIndex);
            updateNavigationButtons();
            updateStatusHeading();
        }
    });

    // Next button click event
    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const maxIndex = parseInt(studentCount.value) - 1;
        if (currentStudentIndex < maxIndex) {
            currentStudentIndex++;
            updateActiveState(currentStudentIndex);
            updateNavigationButtons();
            updateStatusHeading();
        }
    });

    function updateActiveState(activeIndex) {
        studentBoxes.forEach((box, idx) => {
            if (idx === activeIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }

    function updateNavigationButtons() {
        const count = parseInt(studentCount.value);

        // Hide both buttons if only one student
        if (count <= 1) {
            previousBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        // Show/hide Previous button based on current student
        previousBtn.style.display = currentStudentIndex === 0 ? 'none' : '';

        // Show/hide Next button based on current student
        nextBtn.style.display = currentStudentIndex === count - 1 ? 'none' : '';
    }

    function updateStatusHeading() {
        const count = parseInt(studentCount.value);
        statusHeading.textContent = `Student ${currentStudentIndex + 1} of ${count}`;
    }

    // Initialize the form
    updateActiveState(0);
    updateStatusHeading();
});

document.addEventListener('DOMContentLoaded', function () {
    // Student boxes functionality
    const studentBoxes = document.querySelectorAll('.noOfStdBox');
    const studentCount = document.getElementById('studentCount');
    const previousBtn = document.querySelector('.btn-danger');  // Previous button
    const nextBtn = document.querySelector('.btn-success');     // Next button
    const resetBtn = document.querySelector('.btn-secondary');  // Reset button
    const submitBtn = document.querySelector('.btn-primary');   // Submit All button
    const studentFormsContainer = document.getElementById('studentForms');
    const statusHeading = document.querySelector('h6.text-center.my-3.fs-5');

    let currentStudentIndex = 0;  // Track current student
    let studentForms = [];        // Store created student forms

    // Initialize the first student form
    createStudentForm(1);

    // Initially hide Previous and Next buttons if only 1 student
    updateNavigationButtons();

    // Show boxes based on selection
    studentCount.addEventListener('change', function () {
        const count = parseInt(this.value);

        // Create any missing student forms
        for (let i = studentForms.length + 1; i <= count; i++) {
            createStudentForm(i);
        }

        studentBoxes.forEach((box, index) => {
            if (index < count) {
                box.style.display = '';
            } else {
                box.style.display = 'none';
            }
        });

        // Reset to first student
        currentStudentIndex = 0;
        updateActiveState(currentStudentIndex);
        updateNavigationButtons();
        updateStatusHeading();
        showCurrentStudentForm();
    });

    // Add click event for each student box
    studentBoxes.forEach((box, index) => {
        box.addEventListener('click', function () {
            // Validate current form before switching to another student
            if (index !== currentStudentIndex) {
                if (validateCurrentForm()) {
                    currentStudentIndex = index;
                    updateActiveState(currentStudentIndex);
                    updateNavigationButtons();
                    updateStatusHeading();
                    showCurrentStudentForm();
                } else {
                    // If validation fails, keep on current student
                    alert("Please complete all required fields for the current student before proceeding.");
                }
            }
        });
    });

    // Previous button click event
    previousBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (currentStudentIndex > 0) {
            if (validateCurrentForm()) {
                currentStudentIndex--;
                updateActiveState(currentStudentIndex);
                updateNavigationButtons();
                updateStatusHeading();
                showCurrentStudentForm();
            } else {
                alert("Please complete all required fields for the current student before proceeding.");
            }
        }
    });

    // Next button click event
    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const maxIndex = parseInt(studentCount.value) - 1;
        if (currentStudentIndex < maxIndex) {
            if (validateCurrentForm()) {
                currentStudentIndex++;
                updateActiveState(currentStudentIndex);
                updateNavigationButtons();
                updateStatusHeading();
                showCurrentStudentForm();
            } else {
                alert("Please complete all required fields for the current student before proceeding.");
            }
        }
    });

    // Reset button click event
    resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm("Are you sure you want to reset all form data?")) {
            // Reset all forms
            studentForms.forEach(form => {
                form.querySelectorAll('input[type="text"], input[type="date"]').forEach(input => {
                    input.value = '';
                });
                form.querySelectorAll('select').forEach(select => {
                    select.selectedIndex = 0;
                });
                form.querySelectorAll('input[type="radio"]').forEach(radio => {
                    radio.checked = false;
                });

                // Clear all error messages
                form.querySelectorAll('.text-danger').forEach(span => {
                    span.textContent = '';
                });
            });

            // Reset to first student
            currentStudentIndex = 0;
            updateActiveState(currentStudentIndex);
            updateNavigationButtons();
            updateStatusHeading();
            showCurrentStudentForm();
        }
    });

    // Submit All button click event
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const count = parseInt(studentCount.value);
        let allValid = true;

        // Save current form values
        validateCurrentForm();

        // Validate all student forms
        for (let i = 0; i < count; i++) {
            const isCurrentFormValid = validateForm(i + 1);
            if (!isCurrentFormValid) {
                allValid = false;
                if (i !== currentStudentIndex) {
                    // Switch to the invalid form
                    currentStudentIndex = i;
                    updateActiveState(currentStudentIndex);
                    updateNavigationButtons();
                    updateStatusHeading();
                    showCurrentStudentForm();
                }
                break;
            }
        }

        if (allValid) {
            alert("All forms are valid! Form would be submitted.");
            // Form submission logic would go here
            // document.querySelector('form').submit();
        } else {
            alert("Please complete all required fields for all students before submitting.");
        }
    });

    function updateActiveState(activeIndex) {
        studentBoxes.forEach((box, idx) => {
            if (idx === activeIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });
    }

    function updateNavigationButtons() {
        const count = parseInt(studentCount.value);

        // Hide both buttons if only one student
        if (count <= 1) {
            previousBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        // Show/hide Previous button based on current student
        previousBtn.style.display = currentStudentIndex === 0 ? 'none' : '';

        // Show/hide Next button based on current student
        nextBtn.style.display = currentStudentIndex === count - 1 ? 'none' : '';
    }

    function updateStatusHeading() {
        const count = parseInt(studentCount.value);
        statusHeading.textContent = `Student ${currentStudentIndex + 1} of ${count}`;
    }

    function createStudentForm(index) {
        // If the form already exists, don't recreate it
        if (studentForms[index - 1]) {
            return;
        }

        // Clone the first student form as a template
        if (index === 1) {
            // For the first student, use the existing form
            studentForms[0] = document.querySelector('.student-form');
        } else {
            // For subsequent students, clone the first form
            const newForm = studentForms[0].cloneNode(true);

            // Update IDs and names to be unique for this student
            newForm.querySelectorAll('[id]').forEach(element => {
                if (element.id.includes('_1')) {
                    const baseId = element.id.split('_1')[0];
                    element.id = `${baseId}_${index}`;
                }
            });

            // Update form heading
            const heading = newForm.querySelector('h5');
            if (heading) {
                heading.textContent = `Student ${index} Information`;
            }

            // Clear input values
            newForm.querySelectorAll('input[type="text"], input[type="date"]').forEach(input => {
                input.value = '';
            });

            // Reset radio buttons
            newForm.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;

                // Update name attribute for radio groups
                if (radio.name.includes('[0]')) {
                    radio.name = `gender[${index - 1}]`;
                }
            });

            // Reset dropdowns
            newForm.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });

            // Initially hide the form
            newForm.style.display = 'none';

            // Add to DOM
            studentFormsContainer.appendChild(newForm);

            // Store reference
            studentForms[index - 1] = newForm;
        }
    }

    function showCurrentStudentForm() {
        studentForms.forEach((form, index) => {
            if (index === currentStudentIndex) {
                form.style.display = 'block';
            } else {
                form.style.display = 'none';
            }
        });
    }

    function validateCurrentForm() {
        return validateForm(currentStudentIndex + 1);
    }

    function validateForm(studentNumber) {
        let isValid = true;

        // Text fields validation (only letters and spaces)
        const studentName = document.getElementById(`studentName_${studentNumber}`);
        const studentNameError = document.getElementById(`studentNameError_${studentNumber}`);
        const fatherName = document.getElementById(`fatherName_${studentNumber}`);
        const fatherNameError = document.getElementById(`fatherNameError_${studentNumber}`);

        const nameRegex = /^[A-Za-z\s]+$/;

        // Student name validation
        if (!studentName.value.trim()) {
            studentNameError.textContent = "Student name is required";
            isValid = false;
        } else if (!nameRegex.test(studentName.value)) {
            studentNameError.textContent = "Only alphabets and spaces are allowed";
            isValid = false;
        } else {
            studentNameError.textContent = "";
        }

        // Father's name validation
        if (!fatherName.value.trim()) {
            fatherNameError.textContent = "Father's name is required";
            isValid = false;
        } else if (!nameRegex.test(fatherName.value)) {
            fatherNameError.textContent = "Only alphabets and spaces are allowed";
            isValid = false;
        } else {
            fatherNameError.textContent = "";
        }

        // Gender validation
        const genderError = document.getElementById(`genderError_${studentNumber}`);
        const genderSelected = document.querySelector(`input[name="gender[${studentNumber - 1}]"]:checked`);

        if (!genderSelected) {
            genderError.textContent = "Please select a gender";
            isValid = false;
        } else {
            genderError.textContent = "";
        }

        // Date validation
        const admissionDate = document.getElementById(`admissionDate_${studentNumber}`);
        const admissionDateError = document.getElementById(`admissionDateError_${studentNumber}`);

        if (!admissionDate.value) {
            admissionDateError.textContent = "Admission date is required";
            isValid = false;
        } else {
            admissionDateError.textContent = "";
        }

        // Dropdown validation
        const dropdowns = [
            { id: `admissionType_${studentNumber}`, errorId: `admissionTypeError_${studentNumber}`, label: "Admission type" },
            { id: `schoolType_${studentNumber}`, errorId: `schoolTypeError_${studentNumber}`, label: "School type" },
            { id: `studentClass_${studentNumber}`, errorId: `studentClassError_${studentNumber}`, label: "Class" },
            { id: `city_${studentNumber}`, errorId: `cityError_${studentNumber}`, label: "City" },
            { id: `state_${studentNumber}`, errorId: `stateError_${studentNumber}`, label: "State" },
            { id: `zone_${studentNumber}`, errorId: `zoneError_${studentNumber}`, label: "Zone" }
        ];

        dropdowns.forEach(dropdown => {
            const select = document.getElementById(dropdown.id);
            const errorElement = document.getElementById(dropdown.errorId);

            if (select.selectedIndex === 0 || select.value === "") {
                errorElement.textContent = `Please select a ${dropdown.label}`;
                isValid = false;
            } else {
                errorElement.textContent = "";
            }
        });

        return isValid;
    }

    // Initialize the form
    updateActiveState(0);
    updateStatusHeading();
    showCurrentStudentForm();
});