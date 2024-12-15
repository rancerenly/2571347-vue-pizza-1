export const getImage = (path) => {
    const publicUrl = "http://localhost:3000";
    const divider = path.startsWith("/") ? "" : "/";
    console.log('[publicUrl, path].join(divider)', [publicUrl, path].join(divider));
    return [publicUrl, path].join(divider);
};
