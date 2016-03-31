<?php
//require_once('JWT/JWT.php');
namespace IP;

use PDO;

class DbUtils
{
    private $dbh = null;
    
    public function __construct()
    {
        $this->connect();
        
    }
    
    public function __destruct()
    {
        error_log("Closing DB connection...");
        $this->dbh = null;
    }
    
    public function connect()
    {
    
         $dbServer = Config::DB_HOST;
         $dbUser  = Config::DB_USER;
         $dbPassword = Config::DB_PASSWORD;
         $dbName = Config::DB_NAME;

        try {
            $this->dbh = new PDO("mysql:host=$dbServer;dbname=$dbName", $dbUser, $dbPassword);
            // set the PDO error mode to exception
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            error_log("Connected successfully");
        } catch (\PDOException $e) {
            error_log('Connection failed: ' . $e->getMessage());
        }
    }
    
    public function getUser($username = null, $id = null, $role=null)
    {
        
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return null;
        }
        
        /*
        * We will fetch user id and password fields for the given username
        */
        $sql = "SELECT iduser, name, password, username, email, mobile, role, institute, status
                FROM   user ";
        
        if ($username) {
            $sql .=  "WHERE username = :username";
        } 
        
        if ($id) {
            $sql .=  "WHERE iduser = :id";
        }
        
        if ($role) {
            $sql .= "WHERE role= :role";
        }

        error_log($sql);
        $stmt = $dbh->prepare($sql);
        
        if ($username) {
            $stmt->bindParam(':username', $username); 
        } 
        
        if($id) {
            $stmt->bindParam(':id', $id);
        }
        
        if ($role) {
            $stmt->bindParam(':role', $role);
        }
        
        $stmt->execute();

        if ($username || $id) {
            return $stmt->fetch(PDO::FETCH_ASSOC);    
        }
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function createUser($user)
    {
        
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        $password = password_hash($user->password, PASSWORD_DEFAULT);
        $sql = "insert into user 
                (name, password, username, email, role, institute, status)
                values 
                (:name, :password, :username, :email, :role, :institute, :status)";
        
        $stmt = $dbh->prepare($sql);
        
        $stmt->bindValue(':name', $user->name);
        $stmt->bindValue(':password', $password);
        $stmt->bindValue(':username', $user->username);
        $stmt->bindValue(':email', $user->email);
        $stmt->bindValue(':role', $user->role);
        $stmt->bindValue(':institute', $user->institute);
        $stmt->bindValue(':status', $user->status);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('insert failed: ' . $e->getMessage());
            return 'Userid already exists!!';
        }
        
        return 'SUCCESS';
    }
    
    public function updatePassword($user)
    {
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        $sql = "update user set password= :password where iduser = :id";
        
        $stmt = $dbh->prepare($sql);
        
        $password = password_hash($user->newPassword, PASSWORD_DEFAULT);

        $stmt->bindValue(':password', $password);
        $stmt->bindParam(':id', $user->iduser);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }    
    
    public function approveUser($userId)
    {
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        $sql = "update user set status= 'Approved' where iduser = :id";
        
        $stmt = $dbh->prepare($sql);
        
        $stmt->bindParam(':id', $userId);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }    
    
    public function deleteUser($userId)
    {
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        if ($userId == null) {
            return "No userId given!!";
        }
        
        $sql = "delete from user where iduser = :id";
        
        $stmt = $dbh->prepare($sql);
        
        $stmt->bindParam(':id', $userId);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('delete failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }    
    
    public function updateProfile($user)
    {
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        $sql = "update user set name= :name, email=:email, mobile=:mobile, role=:role, institute=:institute where iduser = :id";
        
        $stmt = $dbh->prepare($sql);
        $stmt->bindValue(':name', $user->name);
        $stmt->bindValue(':email', $user->email);
        $stmt->bindValue(':mobile', $user->mobile);
        $stmt->bindValue(':role', $user->role);
        $stmt->bindValue(':institute', $user->institute);
         
        $stmt->bindParam(':id', $user->iduser);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }    
    
    public function insertValuation($input)
    {
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
          $sql = "insert into valuation 
                (name, iduser, created_date, modified_date, data)
                values 
                (:name, :iduser, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, :data)";
        
        $stmt = $dbh->prepare($sql);
        
        $stmt->bindValue(':name', $input->name);
        $stmt->bindValue(':iduser', $input->userId);
        
        $data = json_encode($input);
        
        $stmt->bindValue(':data', $data);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('insert failed: ' . $e->getMessage());
            return null;
        }
        
        return $dbh->lastInsertId();
    }
    
    public function updateValuation($input)
    {
       
        $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        $sql = "update valuation set name= :name, data=:data, modified_date=CURRENT_TIMESTAMP where idvaluation = :id";
        
        $stmt = $dbh->prepare($sql);
        
        
        $stmt->bindValue(':name', $input->name);
        
        $data = json_encode($input);
        
        $id = intval($input->idvaluation);
        $stmt->bindValue(':data', $data);
        $stmt->bindParam(':id', $id);
        
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }
    
    public function getValuation($id = null, $iduser = null)
    {
        $dbh = $this->dbh;
        if ($dbh == null) {
            return null;
        }
        
        $result = null;
        
        $sql = "select v.idvaluation, DATE_FORMAT(v.created_date, '%d/%m/%Y %h:%i %p') as createdDate, v.name, v.data, u.iduser as userId, u.name as userName
                from valuation v, user u
                where u.iduser = v.iduser ";
        
        if ($id) {
            $sql  .= ' and v.idvaluation = '.$id;
        }
        
        if ($iduser) {
            $sql .= '  and u.iduser = '.$iduser;
        }
        
        $sql .= '  order by v.idvaluation';
        error_log($sql);
        
        $stmt = $dbh->prepare($sql);
        
        try {
            $stmt->execute();
            //Copy result into a associative array
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($result as &$row) { // Use reference so we can modify in place
                $data = json_decode($row['data']);
                $data->idvaluation = $row['idvaluation'];
                $data->createdDate = $row['createdDate'];
                $data->userName = $row['userName'];
                $data->userId = $row['userId'];
                
                $row = $data;
                
            }
            
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return null;
        }
        
        return $result;
    }
    
    public function getConfig($name = null)
    {
        $dbh = $this->dbh;
        if ($dbh == null) {
            return null;
        }
        
        $result = null;
        
        $sql = "select name, data from config";
        
        if ($name) {
            $sql  .= " where name = '$name'";
        }
     
        error_log($sql);
        $stmt = $dbh->prepare($sql);
        
        try {
            $stmt->execute();
            //Copy result into a associative array
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //error_log(json_encode($result));
            
            foreach ($result as &$row) { // Use reference so we can modify in place
                $data = json_decode($row['data']);
                $row['data'] = $data;
                
            }
            
        } catch (\PDOException $e) {
            error_log('Select failed: ' . $e->getMessage());
            return null;
        }
        
        return $result;
    }
    
    public function updateConfig($name, $input)
    {
            $dbh = $this->dbh;
        
        if ($dbh == null) {
            return "Database connection failed";
        }
        
        if ($name == "") {
            return "Missing Key";
        }
        $sql = "update config set data=:data where name = :name";
        
        $stmt = $dbh->prepare($sql);
        
        
        $stmt->bindValue(':name', $name);
        
        $data = json_encode($input);
        error_log($data);
        
        $stmt->bindValue(':data', $data);
        
        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            error_log('update failed: ' . $e->getMessage());
            return "FAILED";
        }
        
        return "SUCCESS";
    }
}