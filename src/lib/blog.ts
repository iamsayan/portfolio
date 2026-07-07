export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  pubDate: Date;
  tags: string[];
  readingTime: number;
  comingSoon?: boolean;
}

const UPCOMING_POSTS: BlogPost[] = [
  {
    id: "how-to-add-checkout-fee-for-a-payment-gateway",
    title: "How to Add WooCommerce Checkout Fee for a Payment Gateway",
    description:
      "Sometimes, it is necessary to add a Transaction or Checkout Fee on the WooCommerce Checkout page if you want to charge a specific amount from your customer as payment gateway charges. Here's a simple PHP snippet to add a fee to the checkout for every payment or for a specific payment gateway.",
    pubDate: new Date("2021-03-04"),
    tags: ["WooCommerce", "PHP", "Payment Gateways"],
    readingTime: 4,
    comingSoon: false,
    content: `
<p style="text-align: justify;">Sometimes, it is necessary to add a Transaction or Checkout Fee on the WooCommerce Checkout page if you want to charge a specific amount from your customer as payment gateway charges. Here’s a simple PHP snippet to add a fee to the checkout for every payment or for a specific payment gateway.</p>
<p style="text-align: justify;">Please do remember that for certain payment gateways such as PayPal, adding checkout fees is currently against their Terms of Service so make sure to check this first.</p>
<p style="text-align: justify;">Just copy this snippet to the end of your active theme's <code>functions.php</code> file or you can use the <a href="https://wordpress.org/plugins/code-snippets/" target="_blank" rel="noopener">Code Snippets</a> plugin from WordPress.org repository. Enjoy!</p>

<h3 style="margin-top: 2rem;">Snippet #1: Add Checkout Fee for all Active WooCommerce Payment Gateways</h3>
<p style="text-align: justify;">This snippet will add a fixed Transaction Charge of $5 to the Checkout page for all available action WooCommerce Payment Gateways.</p>
<pre><code class="language-php">/**
 * @snippet       WooCommerce Add fee to checkout
 * @author        Sayan Datta
 * @testedwith    WooCommerce 4.8
 * @donate $10    https://paypal.me/iamsayan
 */
  
add_action( 'woocommerce_cart_calculate_fees', 'sayand_add_checkout_fee' );
  
function sayand_add_checkout_fee( $cart ) {
   // Edit "Transaction Fee" and "5" below to control Label and Amount
   $cart-&gt;add_fee( 'Transaction Fee', 5 );
}</code></pre>

<h3 style="margin-top: 2rem;">Snippet #2: Add Checkout Fee to a specific WooCommerce Payment Gateway</h3>
<p style="text-align: justify;">This snippet will add a fixed Transaction Charge of $5 to the Checkout page to a specific gateway called "gateway". It also triggers checkout updates dynamically when the payment method selection changes in the UI.</p>
<pre><code class="language-php">/**
 * @snippet       WooCommerce Add fee to checkout
 * @author        Sayan Datta
 * @testedwith    WooCommerce 4.8
 * @donate $10    https://paypal.me/iamsayan
 */

// Part 1: assign fee
add_action( 'woocommerce_cart_calculate_fees', 'sayand_add_checkout_fee' );
  
function sayand_add_checkout_fee( $cart ) {
   $chosen_gateway = WC()-&gt;session-&gt;get( 'chosen_payment_method' );
   if ( $chosen_gateway == 'gateway' ) { // here gateway can be replaced by paypal, cod etc
      // Edit "Transaction Fee" and "5" below to control Label and Amount
      $cart-&gt;add_fee( 'Transaction Fee', 5 );
   }
}

// Part 2: reload checkout on payment gateway change
add_action( 'woocommerce_review_order_before_payment', 'sayand_refresh_checkout_on_payment_methods_change' );
  
function sayand_refresh_checkout_on_payment_methods_change() {
    ?&gt;
    &lt;script type="text/javascript"&gt;
        (function($){
            $( 'form.checkout' ).on( 'change', 'input[name^="payment_method"]', function() {
                $('body').trigger('update_checkout');
            });
        })(jQuery);
    &lt;/script&gt;
    &lt;?php
}</code></pre>

<h3 style="margin-top: 2rem;">Snippet #3: Add Checkout Fee to a specific Shipping Method and Country</h3>
<p style="text-align: justify;">This snippet will add a fixed Transaction Charge of $5 to the Checkout page to a specific shipping method called "local_pickup" and country called "US".</p>
<pre><code class="language-php">/**
 * @snippet       WooCommerce Add fee to checkout
 * @author        Sayan Datta
 * @testedwith    WooCommerce 4.8
 * @donate $10    https://paypal.me/iamsayan
 */

add_action( 'woocommerce_cart_calculate_fees', 'sayand_add_checkout_fee' );
  
function sayand_add_checkout_fee( $cart ) {
   $chosen_methods = WC()-&gt;session-&gt;get( 'chosen_shipping_methods' );
   $chosen_shipping = $chosen_methods[0];
   if ( 0 === strpos( $chosen_shipping, 'local_pickup' ) &amp;&amp; WC()-&gt;customer-&gt;get_billing_country() == 'US' ) {
      // Edit "Transaction Fee" and "5" below to control Label and Amount
      $cart-&gt;add_fee( 'Transaction Fee', 5 );
   }
}</code></pre>

<h4 style="margin-top: 2rem;">Does this snippet still work?</h4>
<p style="text-align: justify;">I have tested this code with OceanWP theme, WooCommerce 4.8, and a WordPress-friendly hosting on PHP 7.4. If you encounter any compatibility issues or would like to report feedback, feel free to use the comments below!</p>
`,
  },
  {
    id: "scaling-woocommerce-options-table-queries",
    title: "Scaling WooCommerce: Optimizing Options Table Queries on High-Traffic Sites",
    description:
      "When a WooCommerce store scales to thousands of orders per day, the wp_options table is often the first bottleneck. Here is a guide to auditing autoloaded options, query tuning, and cache configurations.",
    pubDate: new Date("2024-05-12"),
    tags: ["WordPress", "MySQL", "WooCommerce"],
    readingTime: 6,
    comingSoon: false,
    content: `
<p>When a WooCommerce store starts scaling, the single most common cause of high page response latency (specifically slow TTFB) is database congestion. And more often than not, the culprit is the <code>wp_options</code> table.</p>

<p>By default, WordPress queries all rows in the options table where <code>autoload = 'yes'</code> on every single request. If this dataset is bloated, it drains memory and clogs up the query execution pipeline.</p>

<h2>Step 1: Auditing Your Autoloaded Options Size</h2>
<p>To check if your options table is bloated, run this MySQL query directly in PHPMyAdmin or via WP-CLI:</p>

<pre><code class="language-sql">SELECT SUM(LENGTH(option_value)) / 1024 AS size_kb 
FROM wp_options 
WHERE autoload = 'yes';</code></pre>

<p><strong>Autoload Size thresholds:</strong></p>
<ul>
  <li><strong>< 800kb</strong> — Good condition. Standard baseline.</li>
  <li><strong>800kb - 2MB</strong> — Warning zone. Time to clean up.</li>
  <li><strong>> 2MB</strong> — Danger. Autoload options will cause visible query lag.</li>
</ul>

<h2>Step 2: Identifying the Bloat Culprits</h2>
<p>To find the exact option keys that are taking up the most space, run this query:</p>

<pre><code class="language-sql">SELECT option_name, LENGTH(option_value) AS option_len 
FROM wp_options 
WHERE autoload = 'yes' 
ORDER BY option_len DESC 
LIMIT 10;</code></pre>

<p>WooCommerce transients, session storage keys, and legacy plugin configuration matrices are the most frequent causes of database bloat.</p>

<h2>Step 3: Programmatic Clean-up Snippet</h2>
<p>If you identify expired transients or session bloat, you can purge them safely. Copy this snippet to your theme's <code>functions.php</code> or execute it inside WP-CLI:</p>

<pre><code class="language-php">/**
 * @snippet       Purge Expired WooCommerce Transients
 * @author        Sayan Datta
 */
function sayan_purge_woocommerce_session_bloat() {
    global $wpdb;
    
    // Purge all old options transients
    $wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_wc_session_%'" );
    $wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_wc_session_%'" );
}</code></pre>

<p>By keeping your database clean and using memory caches like Redis, you can ensure WooCommerce checkouts remain sub-second even under peak load.</p>
`,
  },
  {
    id: "lightweight-headless-auth-middleware-laravel",
    title: "Building Lightweight Headless API Auth Middleware in Laravel",
    description:
      "If you are building a headless project and only need simple JWT token validation, pulling in Laravel Passport or Sanctum might be overkill. Here is how to write a custom authentication middleware.",
    pubDate: new Date("2024-11-20"),
    tags: ["Laravel", "API", "PHP"],
    readingTime: 5,
    comingSoon: false,
    content: `
<p>Laravel Sanctum and Passport are fantastic packages for robust API auth. However, if you are designing a microservice or static headless application that only needs to validate pre-signed JWT tokens from an identity provider, custom lightweight middleware is cleaner and significantly faster.</p>

<h2>The Plan</h2>
<p>We will create a simple Laravel HTTP Middleware that intercepts incoming requests, extracts a Bearer token, validates its signature, and binds the token payload to the request user.</p>

<h2>Step 1: Generating the Middleware</h2>
<p>Run the Artisan command to scaffold our class:</p>

<pre><code class="language-bash">php artisan make:middleware ValidateJWTToken</code></pre>

<h2>Step 2: Writing the JWT Middleware Logic</h2>
<p>Open <code>app/Http/Middleware/ValidateJWTToken.php</code> and write the following code:</p>

<pre><code class="language-php">&lt;?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;

class ValidateJWTToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        
        if (!$token) {
            return response()->json(['error' => 'Token missing'], 401);
        }
        
        // Verify simple signature (e.g. SHA256 matches our secret)
        $secret = env('API_JWT_SECRET');
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return response()->json(['error' => 'Malformed packet'], 401);
        }
        
        $signature = hash_hmac('sha256', "$parts[0].$parts[1]", $secret, true);
        $signatureBase64 = base64_encode($signature);
        
        if ($signatureBase64 !== $parts[2]) {
            return response()->json(['error' => 'Invalid signature'], 401);
        }
        
        // Bind decrypted claims payload to Laravel request attributes
        $claims = json_decode(base64_decode($parts[1]), true);
        $request->attributes->set('user_claims', $claims);

        return $next($request);
    }
}</code></pre>

<h2>Step 3: Registering the Route Middleware</h2>
<p>Now, register it in your application configuration (or inside <code>app.php</code> depending on your Laravel version):</p>

<pre><code class="language-php">// In app/Http/Kernel.php or bootstrap/app.php
$middleware->alias([
    'jwt.auth' => \\App\\Http\\Middleware\\ValidateJWTToken::class,
]);</code></pre>

<p>You can now secure routes directly in <code>routes/api.php</code> by chaining the alias:</p>

<pre><code class="language-php">Route::get('/checkout-status', function (Request $request) {
    return response()->json($request->attributes->get('user_claims'));
})->middleware('jwt.auth');</code></pre>
`,
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return UPCOMING_POSTS;
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id);
}
