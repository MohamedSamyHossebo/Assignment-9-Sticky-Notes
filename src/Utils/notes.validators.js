const titleValidator = (v) => {
    if (v) {
        return v !== v.toUpperCase();
    }
    return true;
}

export default titleValidator;