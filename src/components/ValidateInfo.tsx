export const validateCredentials = (username: string, password: string) => {
    let errors = {username: "", password: ""};
    // Check if client name is empty
    if (!username) {
        errors.username = "Username is required.";
    }

    //  Check if password is empty
    if (!password) {
        errors.password = "Password is required.";
    }else {
        // Check the format of the password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.password = "Invalid password! Please try again.";
        }
    }   
    return errors;
};
    