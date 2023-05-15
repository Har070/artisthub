export function storeValidation(state) {
    let errors = {};
    console.log('formstateValidation',state)

    if(!state.first_name){
        errors["first_name"] = "First Name can not be empty";
    }

    if (!state.last_name) {
        errors["last_name"] = "Last Name can not be empty";
    }

    if (!state.type) {
        errors["type"] = "Position can not empty";
    }

    if (state.type && state.type === 'singer' && !state.music_genre) {
        errors["music_genre"] = "Music Genre can not be empty";
    }

    if (!state.country) {
        errors["country"] = "Country can not be empty";
    }

    if (!state.city) {
        errors["city"] = "City can not be empty";
    }

    if (!state.zip_code) {
        errors["zip_code"] = "Zip Code can not be empty";
    }

    if (!state.phone_number) {
        errors["phone_number"] = "Phone Number can not be empty";
    }

    if (!state.dob) {
        errors["dob"] = "Date of Birth can not be empty";
    }

    if (!state.email) {
        errors["email"] = "E-mail address can not be empty";
    }

    if (!state.password) {
        errors["password"] = "Password can not be empty";
    }

    if (!state.description) {
        errors["description"] = "Biography can not be empty";
    }

    if (!state.image) {
        errors["image"] = "Image can not be empty";
    }

    return errors;
}

export function updateValidation(state) {
    let errors = {};
    console.log('formstateValidation',state)

    if(!state.first_name){
        errors["first_name"] = "First Name can not be empty";
    }

    if (!state.last_name) {
        errors["last_name"] = "Last Name can not be empty";
    }

    if (!state.type) {
        errors["type"] = "Position can not empty";
    }

    if (state.type && state.type === 'singer' && !state.music_genre) {
        errors["music_genre"] = "Music Genre can not be empty";
    }

    if (!state.country) {
        errors["country"] = "Country can not be empty";
    }

    if (!state.city) {
        errors["city"] = "City can not be empty";
    }

    if (!state.zip_code) {
        errors["zip_code"] = "Zip Code can not be empty";
    }

    if (!state.phone_number) {
        errors["phone_number"] = "Phone Number can not be empty";
    }

    if (!state.dob) {
        errors["dob"] = "Date of Birth can not be empty";
    }

    if (!state.email) {
        errors["email"] = "E-mail address can not be empty";
    }

    // if (!state.password) {
    //     errors["password"] = "Password can not be empty";
    // }

    if (!state.description) {
        errors["description"] = "Biography can not be empty";
    }

    if (!state.profile_image) {
        errors["profile_image"] = "Image can not be empty";
    }

    return errors;
}
