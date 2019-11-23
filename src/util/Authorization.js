import jwt from 'jsonwebtoken';
import process from 'process';

export const confirmAdmin = (token, key) => {
    try {
        const decoded_token = jwt.verify(token, key);

        if (decoded_token.is_admin) return 1;
    } catch { return 0; }
    return 0;
};

export const confirmLoggedIn = (token, key) => {
    var value = 0;
    try { 
        value = (jwt.verify(token, key))? 1 : 0;
    } catch { 
        value = 0; 
    }
    return value;
};