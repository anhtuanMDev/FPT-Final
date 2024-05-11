<?php
$databaseHost = '127.0.0.1:3306';
$databaseName = 'orangic';
$databaseUsername = 'root';
$databasePassword = 'WASERE12345@';

try {
	$dbConn = new PDO("mysql:host={$databaseHost};dbname={$databaseName}", 
						$databaseUsername, $databasePassword);
	$dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo $e->getMessage();
}