<?php
require_once ('./index.php');
require 'vendor/autoload.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: Post");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$secretKey = 'sk_test_51OsaA1AFTGMMMmVwrTy65JKAW5GUsRQAaMh8sFTGYIeNdtukbxAH2J72I15SwbgPBIJrIry8ruDxZ4kDfHdkzW9400ukUPgs2H';
\Stripe\Stripe::setApiKey($secretKey);

try {
  // $data = json_decode(file_get_contents('php://input'));
  // $amount = $data->amount;


  $customer = \Stripe\Customer::create(); // create a new customer
  $paymentIntent = \Stripe\PaymentIntent::create([
    // 'amount' => 1000, // replace with your amount
    // 'currency' => 'usd', // replace with your currency
    // 'customer' => $customer->id,
    'amount' => 1099,
    'currency' => 'usd',
    'customer' => $customer->id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    'automatic_payment_methods' => [
      'enabled' => 'true',
    ],

  ]);

  $ephemeralKey = \Stripe\EphemeralKey::create(
    ["customer" => $customer->id],
    ["stripe_version" => "2023-10-16"]
  );


  echo json_encode(
    [
      'paymentIntent' => $paymentIntent->client_secret,
      'ephemeralKey' => $ephemeralKey->secret,
      'customer' => $customer->id,
      // 'publishableKey' => 'pk_test_oKhSR5nslBRnBZpjO6KuzZeX'
    ]
  );
  // // Return the client secret
  // echo json_encode([
  //   'paymentIntent' => $paymentIntent,
  //   'ephemeralKey' => $ephemeralKey,
  //   'customer' => $customer->id,
  // ]);
} catch (\Stripe\Exception\ApiErrorException $e) {
  // Handle error
  echo json_encode(['error' => $e->getMessage()]);
}



