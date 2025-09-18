
const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return { valid: false, message: "All fields are required" };
    }else if (firstName.length < 3 || firstName.length > 30) {
        return { valid: false, message: "First name must be between 3 and 30 characters" };
    }else if (lastName.length < 3 || lastName.length > 30) {
        return { valid: false, message: "Last name must be between 3 and 30 characters" };
    }else if (!/\S+@\S+\.\S+/.test(email)) {
        return { valid: false, message: "Invalid email format" };
    }else if (password.length < 8 || password.length > 100) {
        return { valid: false, message: "Password must be between 8 and 100 characters" };
    }else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
        return { valid: false, message: "Password must be strong" };
    }
};

module.exports = { validateSignUpData };