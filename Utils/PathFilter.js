const pathFilter = ({ route, allowedMethods }, { method, path }) => {
    return path.startsWith(route) && allowedMethods.includes(method)
};

export default pathFilter