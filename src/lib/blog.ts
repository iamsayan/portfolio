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
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return UPCOMING_POSTS;
}

export async function getBlogPostById(id: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.id === id);
}
