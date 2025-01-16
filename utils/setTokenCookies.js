const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
    const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
    const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

    // Check if the app is in production or development
    const isProduction = process.env.NODE_ENV === 'production';

    // Set Cookie for Access Token
    res.cookie('accessToken', accessToken, {
        maxAge: accessTokenMaxAge,
        httpOnly: true,
        secure: isProduction, // Set to true only in production (HTTPS)
        sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-origin, 'Lax' for first-party cookies in development
        path: '/',
    });

    // Set Cookie for Refresh Token
    res.cookie('refreshToken', refreshToken, {
        maxAge: refreshTokenMaxAge,
        httpOnly: true,
        secure: isProduction, // Set to true only in production (HTTPS)
        sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-origin, 'Lax' for first-party cookies in development
        path: '/',
    });

    // Set Cookie for isLoggedin (non-HTTP only, may be used client-side)
    res.cookie('isLoggedin', true, {
        maxAge: refreshTokenMaxAge,
        httpOnly: false, // Accessible by client-side
        secure: isProduction, // Set to true only in production (HTTPS)
        sameSite: isProduction ? 'None' : 'Lax', // 'None' for cross-origin, 'Lax' for first-party cookies in development
        path: '/',
    });
};

module.exports = setTokensCookies;
