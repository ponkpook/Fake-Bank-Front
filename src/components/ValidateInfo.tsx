export const validateCredentials = (username: string, password: string) => {
    let errors: { usernameError?: string; passwordError?: string } = {};
    
        // Check if client name is empty
        if (!username) {
        errors.usernameError = "Username is required.";
        }
    
        //  Check if password is empty
        if (!password) {
        errors.passwordError = "Password is required.";
        } else {
        // Check the format of the password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.passwordError = "Invalid password! Please try again.";
        }
        }
    
        return errors;
    };
    