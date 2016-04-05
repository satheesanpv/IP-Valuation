<?php
//require_once('JWT/JWT.php');
namespace IP;

use JWT;

class Request
{
    
    /**#@+
     * @const string METHOD constant names
     */
    const METHOD_OPTIONS  = 'OPTIONS';
    const METHOD_GET      = 'GET';
    const METHOD_HEAD     = 'HEAD';
    const METHOD_POST     = 'POST';
    const METHOD_PUT      = 'PUT';
    const METHOD_DELETE   = 'DELETE';
    const METHOD_TRACE    = 'TRACE';
    const METHOD_CONNECT  = 'CONNECT';
    const METHOD_PATCH    = 'PATCH';
    const METHOD_PROPFIND = 'PROPFIND';
    
    private $method = self::METHOD_GET;
    private $headers;
    
  /**#@-*/
  
    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->headers = apache_request_headers();
        error_log('Method: '.$this->method, 0);
    }

    public function setAccessHeader()
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    }

    public function getMethod()
    {
        return $this->method;
    }
  
    public function isPOST()
    {
        return ($this->method === self::METHOD_POST);
    }
    
    public function isGET()
    {
        return ($this->method === self::METHOD_GET);
    }

    
    public function isOPTIONS()
    {
        return ($this->method === self::METHOD_OPTIONS);
    }
  
    public function handleOptions()
    {
        error_log("handleOptions");
        // respond to preflights
        if ($this->isOPTIONS()) {
            // return only the headers and not the content
            // only allow CORS if we're doing a POST - i.e. no saving for now.
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])
                && ($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET'
                || $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST')) {
                error_log("handleOptions set headers");
                header('Access-Control-Allow-Origin: *');
                header('Access-Control-Allow-Headers: accept, authorization, content-type');
            }
            
            return true;
        }
        
        return false;
    }
  
    public function getHeader($header)
    {
        return $this->headers[$header];
    }
    
    public function setHeader($header, $value) {
        //echo $value;
        $this->headers[$header] = $value;
        //print_r($this->headers);
    }
  
    public function getJSON()
    {
        $json = file_get_contents('php://input');
        return json_decode($json);
    }
    
    public function validate($role = "", $userName = "")
    {

        $authHeader = $this->getHeader('Authorization');
        //error_log($authHeader);
        if (!$authHeader) {
        /*
        * The request lacks the authorization token
         */
            header('HTTP/1.0 400 Bad Request');
            //echo 'Token not found in request';
            return false;
        }
    
       
        list($jwt) = sscanf($authHeader, 'Bearer %s');

        //error_log($jwt);
        if ($jwt) {
            try {
                
                /*
                * decode the jwt using the key from config
                */
                $secretKey = base64_decode(Config::JWT_KEY);
                $token = JWT::decode($jwt, $secretKey, Config::JWT_ALGORITHM);
                //error_log(json_encode($token));
                //error_log(time());
                if ($token->exp < time()){
                    
                    header('HTTP/1.0 401 Unauthorized');
                    return false;
                }
                
                if ($role && $token->data->role != $role) {
                    header('HTTP/1.0 401 Unauthorized');
                    return false;
                }
                
                if ($userName && $token->data->username != $userName) {
                    header('HTTP/1.0 401 Unauthorized');
                    return false; 
                }
                
                return true;
          
            } catch (Exception $e) {
                /*
                * the token was not able to be decoded.
                * this is likely because the signature was not able to be verified (tampered token)
                */
                header('HTTP/1.0 401 Unauthorized');
                return false;
            }
        } else {
            /*
            * No token was able to be extracted from the authorization header
            */
            header('HTTP/1.0 400 Bad Request');
            return false;
        }
    }
}