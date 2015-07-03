# FSB (Fuck Sneaker Bots)

This was an exercise in building a Chrome extension. It knows when you're looking at a show on Footlocker's mobile site then presents an option of setting a target time, size, and CC security code. When the time is hit, it will add to cart, send to checkout, insert the security code, and complete the checkout.

## Who is this for?

Developers, mostly. It demonstrates the basics of setting up an extension, targeting specific pages, and enabling across-tab communication. It uses the background page to maintain state. A series of scripts are injected into pages to start processes, capture data from tabs, and send messages. The background page (through `background.js`) acts as a router of sorts, receiving messages and firing off new events. Most activity is logged, so watch the console of various tabs and the background page to monitor state.

## This is not production-ready

If you're a sneakerhead trying to cop a new release, you'll probably be let down. Besides the fact that this code is pretty raw, the weakest link is footlocker.com's beat web servers.

I also advise everyone to look through the source code and make sure that it is safe. It is, but you don't know that until you look at it for sure.

## Usage

**All activity must take place through m.footlocker.com**.

* Clone and install the plugin in Chrome
* With the plugin enabled, sign into your Footlocker account. Ensure you have a credit card and address saved on file.
* Add one item -- the cheapest item for sale in the store -- to your cart, then open the cart in a tab. **This tab must stay open and you will also be buying this cheap item.**
* In another tab, go to the page of the item you want. The page tab icon will appear in your address bar. Click it, set your target timestamp (GMT formatted, see http://www.epochconverter.com), your size, and the security code from your CC.
* Submit to start the process.

When the target time is reached, it will POST the form, send a message to your cart tab to move to checkout, and complete the purchase. In my tests, there was an occassional bug related to a JS error on the site that prevented checkout from completing. Keep an eye on the Chrome Javascript console to watch for this.

## Improvements

What this really needs is the ability to have multiple tabs making requests, coordinating global state through the background page. Since footlocker.com is the weak link, you probably need to try many times before one request goes through. Once one is successful, everything else needs to move onto the next step. It needs to ensure that only one pair of shoes gets purchased in total.