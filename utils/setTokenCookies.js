const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
    const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
    const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  
    // Set cookie for Access Token
    res.cookie('accessToken', accessToken, {
      maxAge: accessTokenMaxAge,
      httpOnly: true,       // Cookie accessible only by the server (cannot be accessed via JavaScript)
      secure: true,         // Cookie only sent over HTTPS
      sameSite: 'none',     // Allow cross-origin requests
      path: '/',            // The cookie is available for all routes
      domain:".vercel.app"
    });
  
    // Set cookie for Refresh Token
    res.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenMaxAge,
      httpOnly: true,       // Cookie accessible only by the server
      secure: true,         // Cookie only sent over HTTPS
      sameSite: 'none',     // Allow cross-origin requests
      path: '/',
      domain:".vercel.app"  
    });
  
    // Set cookie for isLoggedin (non-HTTP only, may be used client-side)
    res.cookie('isLoggedin', true, {
      maxAge: refreshTokenMaxAge,
      httpOnly: false,      // Accessible by JavaScript client-side
      secure: true,         // HTTPS in production
      sameSite: 'none',     // Allow cross-origin requests
      path: '/',
      domain:".vercel.app"
    });
};

module.exports = setTokensCookies;
