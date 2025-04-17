let allStudents = [];
for (let i = 1; i <= 10; i++) {
    allStudents.push(document.getElementById(`std${i}`));
}

studentCount.addEventListener("change", function () {
    let selectedValue = parseInt(studentCount.value);

    allStudents.forEach((student, index) => {
        if (index < selectedValue) {
            student.style.display = "block";
        } else {
            student.style.display = "none";
        }
    });

    setActiveStudent("std1");
});


function setActiveStudent(activeId) {
    allStudents.forEach(student => {
        if (student.id === activeId) {
            student.classList.add("active");
        } else {
            student.classList.remove("active");
        }
    });
}


allStudents.forEach(student => {
    student.addEventListener("click", () => {
        setActiveStudent(student.id);
    });
});


/**
 * Student Form Validation
 * This script validates all required fields in a student form
 * and prevents navigation if any field is missing or invalid.
 */

// Function to validate a single student form
function validateStudentForm(formIndex) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(`[id$='Error_${formIndex}']`).forEach(elem => {
        elem.textContent = '';
    });

    // Validate Student Name
    const studentName = document.getElementById(`studentName_${formIndex}`).value.trim();
    if (!studentName) {
        document.getElementById(`studentNameError_${formIndex}`).textContent = 'Student name is required';
        isValid = false;
    }

    // Validate Father's Name
    const fatherName = document.getElementById(`fatherName_${formIndex}`).value.trim();
    if (!fatherName) {
        document.getElementById(`fatherNameError_${formIndex}`).textContent = 'Father\'s name is required';
        isValid = false;
    }

    // Validate Gender
    const genderSelected = document.querySelector(`input[name="gender[${formIndex - 1}]"]:checked`);
    if (!genderSelected) {
        document.getElementById(`genderError_${formIndex}`).textContent = 'Please select gender';
        isValid = false;
    }

    // Validate Admission Date
    const admissionDate = document.getElementById(`admissionDate_${formIndex}`).value;
    if (!admissionDate) {
        document.getElementById(`admissionDateError_${formIndex}`).textContent = 'Admission date is required';
        isValid = false;
    }

    // Validate Admission Type
    const admissionType = document.getElementById(`admissionType_${formIndex}`).value;
    if (admissionType === 'Select Type' || !admissionType) {
        document.getElementById(`admissionTypeError_${formIndex}`).textContent = 'Please select admission type';
        isValid = false;
    }

    // Validate School Type
    const schoolType = document.getElementById(`schoolType_${formIndex}`).value;
    if (!schoolType) {
        document.getElementById(`schoolTypeError_${formIndex}`).textContent = 'Please select school type';
        isValid = false;
    }

    // Class is pre-selected, but ensure validation
    const studentClass = document.getElementById(`studentClass_${formIndex}`).value;
    if (!studentClass) {
        document.getElementById(`studentClassError_${formIndex}`).textContent = 'Please select class';
        isValid = false;
    }

    // Validate City
    const city = document.getElementById(`city_${formIndex}`).value;
    if (city === 'Select City' || !city) {
        document.getElementById(`cityError_${formIndex}`).textContent = 'Please select city';
        isValid = false;
    }

    // Validate State
    const state = document.getElementById(`state_${formIndex}`).value;
    if (state === 'Select State' || !state) {
        document.getElementById(`stateError_${formIndex}`).textContent = 'Please select state';
        isValid = false;
    }

    // Validate Zone
    const zone = document.getElementById(`zone_${formIndex}`).value;
    if (zone === 'Select Zone' || !zone) {
        document.getElementById(`zoneError_${formIndex}`).textContent = 'Please select zone';
        isValid = false;
    }

    return isValid;
}

// Add an event listener to the Next button
function setupFormNavigation() {
    // For a multi-form setup with Next buttons
    const nextButtons = document.querySelectorAll('.next-form-btn');

    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Form index is 1-based
            const currentFormIndex = index + 1;

            // Validate the current form
            if (validateStudentForm(currentFormIndex)) {
                // If valid, proceed to next form/step
                // This assumes you have a function or logic to show the next form
                showNextForm(currentFormIndex);
            } else {
                // Scroll to the first error
                const firstError = document.querySelector(`[id$='Error_${currentFormIndex}']:not(:empty)`);
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

// Function to handle showing the next form
function showNextForm(currentIndex) {
    // Hide current form
    document.querySelector(`.student-form:nth-child(${currentIndex})`).classList.add('d-none');

    // Show next form
    const nextForm = document.querySelector(`.student-form:nth-child(${currentIndex + 1})`);
    if (nextForm) {
        nextForm.classList.remove('d-none');
    } else {
        // If no next form, this might be the final submission
        // You can trigger form submission here if needed
        document.getElementById('registrationForm').submit();
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    setupFormNavigation();

    // For adding more students dynamically (if applicable)
    const addStudentBtn = document.getElementById('addStudentBtn');
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', function () {
            // Logic to add another student form would go here
            // After adding the form, set up its validation
        });
    }
});


// Wait for DOM to be loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Global variables
    let currentStudentIndex = 1;
    const maxStudents = 10;

    // Form data storage for each student
    const formData = {};

    // Get DOM elements
    const studentCountDropdown = document.getElementById('studentCount');
    const studentBoxesContainer = document.querySelector('.student-boxes-container');
    const studentForms = document.getElementById('studentForms');
    const studentRangeText = document.querySelector('h6.text-center.my-3.fs-5');
    const nextButton = document.querySelector('.btn-success');
    const prevButton = document.querySelector('.btn-danger');
    const resetButton = document.querySelector('.btn-secondary');
    const submitButton = document.querySelector('.btn-primary');
    const studentBoxes = document.querySelectorAll('.noOfStdBox');

    // Initialize the form
    init();

    function init() {
        // Store original forms HTML
        storeOriginalForms();

        // Set initial number of visible student boxes
        updateStudentBoxesVisibility();

        // Set up event listeners
        setupEventListeners();

        // Show first student form
        showStudentForm(1);

        // Update the student range text
        updateStudentRangeText();
    }

    function storeOriginalForms() {
        // Store the initial structure of the form for each student
        for (let i = 1; i <= maxStudents; i++) {
            formData[i] = {
                values: {}
            };
        }
    }

    function setupEventListeners() {
        // Student count dropdown change
        studentCountDropdown.addEventListener('change', function () {
            updateStudentBoxesVisibility();
            updateStudentRangeText();
        });

        // Next button click
        nextButton.addEventListener('click', function () {
            if (validateCurrentForm()) {
                saveCurrentFormData();
                navigateToNextStudent();
            }
        });

        // Previous button click
        prevButton.addEventListener('click', function () {
            saveCurrentFormData();
            navigateToPreviousStudent();
        });

        // Reset button click
        resetButton.addEventListener('click', function () {
            resetCurrentForm();
        });

        // Submit button click
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            saveCurrentFormData(); // Save current form before validation
            if (validateAllForms()) {
                alert('All forms are valid. Ready to submit!');
                // Submit logic would go here
                console.log(formData);
            }
        });

        // Student box buttons click
        studentBoxes.forEach(box => {
            box.addEventListener('click', function () {
                const studentNumber = parseInt(this.id.replace('std', ''));
                if (studentNumber <= parseInt(studentCountDropdown.value)) {
                    saveCurrentFormData(); // Save current form data before validation
                    if (currentStudentIndex === studentNumber || validateCurrentForm()) {
                        showStudentForm(studentNumber);
                    }
                }
            });
        });

        // Set up input field validation events
        setupFormValidationEvents();
    }

    function setupFormValidationEvents() {
        // For each possible field in the current form
        const formElements = studentForms.querySelectorAll('input, select');

        formElements.forEach(element => {
            if (element.type === 'text' || element.type === 'date') {
                element.addEventListener('input', function () {
                    validateField(this);
                });

                element.addEventListener('blur', function () {
                    validateField(this);
                });
            } else if (element.type === 'radio') {
                element.addEventListener('change', function () {
                    const studentNumber = parseInt(this.id.split('_')[1]);
                    validateGender(studentNumber);
                });
            } else if (element.tagName === 'SELECT') {
                element.addEventListener('change', function () {
                    validateField(this);
                });
            }
        });
    }

    function updateStudentBoxesVisibility() {
        const studentCount = parseInt(studentCountDropdown.value);

        // Show/hide student boxes based on selected count
        studentBoxes.forEach((box, index) => {
            const boxNumber = index + 1;
            if (boxNumber <= studentCount) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });

        // If current student is beyond the new count, switch to student 1
        if (currentStudentIndex > studentCount) {
            showStudentForm(1);
        }
    }

    function updateStudentRangeText() {
        const studentCount = parseInt(studentCountDropdown.value);
        studentRangeText.textContent = `Student 1 to ${studentCount}`;
    }

    function saveCurrentFormData() {
        // Save all form field values for the current student
        const studentNum = currentStudentIndex;

        // Save text inputs
        const textInputs = studentForms.querySelectorAll('input[type="text"], input[type="date"]');
        textInputs.forEach(input => {
            const fieldName = input.id.split('_')[0];
            formData[studentNum].values[fieldName] = input.value;
        });

        // Save radio button values
        const checkedRadio = studentForms.querySelector(`input[name="gender[${studentNum - 1}]"]:checked`);
        if (checkedRadio) {
            formData[studentNum].values.gender = checkedRadio.value;
        }

        // Save select values
        const selects = studentForms.querySelectorAll('select');
        selects.forEach(select => {
            const fieldName = select.id.split('_')[0];
            formData[studentNum].values[fieldName] = select.value;
        });
    }

    function loadFormData(studentNum) {
        // Skip if no saved data for this student
        if (!formData[studentNum] || !formData[studentNum].values) return;

        const values = formData[studentNum].values;

        // Load text inputs
        for (const fieldName in values) {
            if (fieldName === 'gender') continue; // Handle gender separately

            const field = document.getElementById(`${fieldName}_${studentNum}`);
            if (field && values[fieldName]) {
                field.value = values[fieldName];
            }
        }

        // Load gender radio selection
        if (values.gender) {
            const genderRadio = document.getElementById(`gender${values.gender}_${studentNum}`);
            if (genderRadio) {
                genderRadio.checked = true;
            }
        }
    }

    function showStudentForm(studentNumber) {
        // Update current student index
        currentStudentIndex = studentNumber;

        // Remove 'active' class from all student boxes
        studentBoxes.forEach(box => box.classList.remove('active'));

        // Add 'active' class to current student box
        document.getElementById(`std${studentNumber}`).classList.add('active');

        // Update the student form heading
        const formHeading = studentForms.querySelector('h5');
        if (formHeading) {
            formHeading.textContent = `Student ${studentNumber} Information`;
        }

        // Load saved form data
        loadFormData(studentNumber);

        // Enable/disable navigation buttons
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        const studentCount = parseInt(studentCountDropdown.value);

        // Previous button should be disabled if on first student
        prevButton.disabled = currentStudentIndex === 1;

        // Next button should be disabled if on last student
        nextButton.disabled = currentStudentIndex === studentCount;
    }

    function navigateToNextStudent() {
        const studentCount = parseInt(studentCountDropdown.value);
        if (currentStudentIndex < studentCount) {
            showStudentForm(currentStudentIndex + 1);
        }
    }

    function navigateToPreviousStudent() {
        if (currentStudentIndex > 1) {
            showStudentForm(currentStudentIndex - 1);
        }
    }

    function resetCurrentForm() {
        // Get the current form
        const form = document.querySelector('.student-form');
        if (!form) return;

        // Reset text inputs
        const textInputs = form.querySelectorAll('input[type="text"], input[type="date"]');
        textInputs.forEach(input => {
            input.value = '';
            // Also clear any validation error messages
            const fieldName = input.id.split('_')[0];
            const errorSpan = document.getElementById(`${fieldName}Error_${currentStudentIndex}`);
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        });

        // Reset radio buttons
        const radioInputs = form.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            radio.checked = false;
        });
        document.getElementById(`genderError_${currentStudentIndex}`).textContent = '';

        // Reset select elements to default values
        const selectElements = form.querySelectorAll('select');
        selectElements.forEach(select => {
            select.selectedIndex = 0;
            // Clear any validation error messages
            const fieldName = select.id.split('_')[0];
            const errorSpan = document.getElementById(`${fieldName}Error_${currentStudentIndex}`);
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        });

        // Clear the stored data for this student
        formData[currentStudentIndex].values = {};
    }

    function validateCurrentForm() {
        let isValid = true;

        // Validate student name
        const studentName = document.getElementById(`studentName_${currentStudentIndex}`);
        if (!validateField(studentName)) {
            isValid = false;
        }

        // Validate father's name
        const fatherName = document.getElementById(`fatherName_${currentStudentIndex}`);
        if (!validateField(fatherName)) {
            isValid = false;
        }

        // Validate gender
        if (!validateGender(currentStudentIndex)) {
            isValid = false;
        }

        // Validate admission date
        const admissionDate = document.getElementById(`admissionDate_${currentStudentIndex}`);
        if (!validateField(admissionDate)) {
            isValid = false;
        }

        // Validate admission type
        const admissionType = document.getElementById(`admissionType_${currentStudentIndex}`);
        if (!validateField(admissionType)) {
            isValid = false;
        }

        // Validate school type
        const schoolType = document.getElementById(`schoolType_${currentStudentIndex}`);
        if (!validateField(schoolType)) {
            isValid = false;
        }

        // Validate city
        const city = document.getElementById(`city_${currentStudentIndex}`);
        if (!validateField(city)) {
            isValid = false;
        }

        // Validate state
        const state = document.getElementById(`state_${currentStudentIndex}`);
        if (!validateField(state)) {
            isValid = false;
        }

        // Validate zone
        const zone = document.getElementById(`zone_${currentStudentIndex}`);
        if (!validateField(zone)) {
            isValid = false;
        }

        return isValid;
    }

    function validateAllForms() {
        const studentCount = parseInt(studentCountDropdown.value);
        let allFormsValid = true;

        // Save current student index
        const originalStudentIndex = currentStudentIndex;

        // Validate each student form
        for (let i = 1; i <= studentCount; i++) {
            currentStudentIndex = i;
            if (!validateCurrentForm()) {
                showStudentForm(i); // Show the invalid form
                allFormsValid = false;
                break;
            }
        }

        // Restore original student form if all forms are valid
        if (allFormsValid) {
            currentStudentIndex = originalStudentIndex;
            showStudentForm(originalStudentIndex);
        }

        return allFormsValid;
    }

    function validateField(field) {
        if (!field) return false;

        const fieldId = field.id;
        const fieldParts = fieldId.split('_');
        const fieldName = fieldParts[0];
        const studentNumber = fieldParts[1];
        const errorSpan = document.getElementById(`${fieldName}Error_${studentNumber}`);

        // Skip validation if error span doesn't exist
        if (!errorSpan) return true;

        // Check if field is empty
        if (!field.value || field.value === '' || (field.tagName === 'SELECT' && field.selectedIndex === 0 && field.options[0].disabled)) {
            errorSpan.textContent = 'This field is required';
            return false;
        } else {
            errorSpan.textContent = '';
            return true;
        }
    }

    function validateGender(studentNumber) {
        const genderRadios = document.querySelectorAll(`input[name="gender[${studentNumber - 1}]"]`);
        const errorSpan = document.getElementById(`genderError_${studentNumber}`);

        let isChecked = false;
        genderRadios.forEach(radio => {
            if (radio.checked) {
                isChecked = true;
            }
        });

        if (!isChecked) {
            errorSpan.textContent = 'Please select a gender';
            return false;
        } else {
            errorSpan.textContent = '';
            return true;
        }
    }
});