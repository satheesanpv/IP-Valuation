<?php
namespace IP;

class Config
{
    // Key for signing the JWT's, I suggest generate it with base64_encode(openssl_random_pseudo_bytes(64))
    const JWT_KEY = 'aXB2YWx1YXRpb25qd2tleQ==';
    
    // Algorithm used to sign the token,
    //see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
    const JWT_ALGORITHM = 'HS512';
    
    //JWT Expiry in second
    const JWT_EXP_SECONDS = 3600;
    
    //DB config
    const DB_USER = 'ip';
    const DB_PASSWORD   = 'test123';
    const DB_HOST      = 'localhost';
    const DB_NAME = 'valuation';
    
    const SERVER_NAME = 'naarm.ernet.in';
}