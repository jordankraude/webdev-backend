const validateQuoteRequestForm = (formData) => {
    const errors = {};
  
    // Validate firstName
    if (!formData.firstName || formData.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }
  
    // Validate lastName
    if (!formData.lastName || formData.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Valid email address is required';
    }
  
    // Validate phoneNumber
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Valid 10-digit phone number is required';
    }
  
    // Validate budget
    const validBudgetOptions = [
      '< $1,000',
      '$1,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000 - $15,000',
      '> $15,000',
    ];
  
    if (!formData.budget || !validBudgetOptions.includes(formData.budget)) {
      errors.budget = 'Please select a valid budget option';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

const validateReviewForm = (formData) => {
    const errors = {};
  
    // Validate firstName
    if (!formData.firstname || formData.firstname.trim() === '') {
      errors.firstname = 'First name is required';
    }
  
    // Validate lastName
    if (!formData.lastname || formData.lastname.trim() === '') {
      errors.lastname = 'Last name is required';
    }
  
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Valid email address is required';
    }
  
    // Validate feedback
    if (!formData.feedback || formData.feedback.trim() === '') {
      errors.feedback = 'Feedback is required';
    }
  
    // Validate wantResponse
    if (!formData.wantResponse || (formData.wantResponse !== 'yes' && formData.wantResponse !== 'no')) {
      errors.wantResponse = 'Please select whether you want a response';
    }
  
    // Return validation result
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

module.exports = {validateQuoteRequestForm, validateReviewForm}