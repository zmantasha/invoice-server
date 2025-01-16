const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenMaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  // Set Cookie for Access Token
  res.cookie('accessToken', accessToken, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    secure: true,           // cookie is only sent over HTTPS
    sameSite: 'None',        // for cross-origin requests
    path: '/'
  });

  // Set Cookie for Refresh Token
  res.cookie('refreshToken', refreshToken, {
    maxAge: refreshTokenMaxAge,
    httpOnly: true,
    secure: true,           // cookie is only sent over HTTPS
    sameSite: 'None',        // for cross-origin requests
    path: '/'
  });

  // Set Cookie for is_auth (non-HTTP only, may be used client-side)
  res.cookie('isLoggedin', true, {
    maxAge: refreshTokenMaxAge,
  httpOnly: false,            // Accessible by client-side
  secure: true, // HTTPS in production
  sameSite: 'None',  
  path: '/'
  });
};

module.exports = setTokensCookies;
