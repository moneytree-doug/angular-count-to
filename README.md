# Angular Count-To

This project is an animated counter for Angularjs. The directive counts from one number to another over a configured duration.
[Demo](http://sparkalow.github.io/angular-count-to/)

## How to use angular count-to


Include the javascript file.

```
<script src="angular.count-to.min.js"></script>
```

Inject the `count-to` directive in your app.

```
var myApp = angular.module('myApp', ['count-to']);
```

Apply the directive to a dom element.
```
 <span currency-name='JPY' count-to="{{countTo}}" value="{{countFrom}}" duration="4"></span>
```


### Attributes

The following attributes can be set as numbers on the directive element.

- ```count-to```  the number to count to.
- ```value```  the number to start counting from.
- ```duration```  how long the count should take in seconds.
- ```currency-name``` (optional) if you supply a currency name such as (USD, JPY, etc...) then it will count in that currency and will account for negative numbers.

