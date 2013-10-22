#Blogalog

A humble attempt at bringing together (and continuing to learn more about) a single-page web app on the following stack:

<ul>
  <li>
    html5/css3, primarily via
    <ul>
      <li>bootstrap</li>
      <li>requirejs</li>
      <li>backbonejs (and underscorejs)</li>
      <li>handlebarsjs</li>
      <li>jquery</li>
      <li>knockout</li>
    </ul>
  </li>
  <li>ruby, sinatra</li>
  <li>mongodb</li>
</ul>

##Status

I'm no longer working on this version of blogalog - my venture into SPA, though short-lived, boiled down to this: figuring out how to jerry-rig interactions b/w the server and the SPA started to get annoying once I got outside simple object CRUD operations (most noteably, OAUTH and security for user-login, but also future issues like SEO.)

Main lesson learned: SPAs are gonna be a great medium for internal tools at the office where our users expect a desktop-like experience in their browsers (especially where we need to replace old win-forms apps for the ... ahem ... elderly users that are scared of web browsers.)

##Lessons Learned

###SPA Pros

<ol>
  <li>Super-quick in the browser (after startup time)</li>
  <li>Provides a desktop-app experience in the browser</li>
  <li>Really promotes app design and object encapsulation on both sides of the wire (ie: clean, well-defined objects server-side, fronted by a REST API and well-defined, matching Javascript objects to integrate with in the browser.)</li>
  <li>Requirejs and Backbonejs and Handlebarjs were made for each other - fantastic way to bring MVC and large-scale apps to the browser</li>
</ol>

###SPA Cons

<ol>
  <li>Slow startup time (most noteably on mobile) - probably not a big deal after optimizing requirejs and minimizing for prod</li>
  <li>Security (or lack thereof) - everything in browser land is inherently insecure (obfuscation helps, but I'm paranoid)</li>
  <li>Not as much community support as a traditional website/blog</li>
</ol>

###General Notes
<ol>
  <li>Mongooz was quick-and-easy, but w/o formally/cleanly declaring the properties and layout of an object, maintenance is gonna start to become a nightmare</li>
  <li>Similar note for Sinatra - for small REST interfaces, great way to get up and running</li>
</ol>
