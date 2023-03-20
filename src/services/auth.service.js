import jwt  from 'jsonwebtoken';
import { TOKEN_SECRET  } from '../constants/index.js';

export class AuthService {


    generateToken(){

        const token = jwt.sign({}, TOKEN_SECRET, { expiresIn: '1m' });

        return token;
    }

    getRefreshToken(refreshToken){
          
            const validateToken = jwt.verify(refreshToken, TOKEN_SECRET);
           
            const newToken = jwt.sign({}, TOKEN_SECRET, { expiresIn: '2m'});
                
            return newToken;
    } 
            
};
    
