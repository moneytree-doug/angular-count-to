var countTo = (function(window, angular) {

  angular.module('countTo', []).directive('countTo', countTo)
  countTo.$inject = ['$timeout'];
  function countTo($timeout) {
    return {
      replace: false,
      scope: true,
      link: function (scope, element, attrs) {

        var e = element[0];
        var num, refreshInterval, duration, steps, step, countTo, value, increment;

        var calculate = calculate;
        var tick = tick;
        var start = start;

        function calculate() {
          refreshInterval = 30;
          step = 0;
          scope.timoutId = null;
          countTo = parseInt(attrs.countTo) || 0;
          scope.value = parseInt(attrs.value, 10) || 0;
          duration = (parseFloat(attrs.duration) * 1000) || 0;

          steps = Math.ceil(duration / refreshInterval);
          increment = ((countTo - scope.value) / steps);
          num = scope.value;
        }

        function tick() {
          scope.timoutId = $timeout(function () {
            num += increment;
            step++;
            if (step >= steps) {
              $timeout.cancel(scope.timoutId);
              num = countTo;
              updateNumber(countTo);
            } else {
              updateNumber(Math.round(num));
              tick();
            }
          }, refreshInterval);

        }

        function start() {
          if (scope.timoutId) {
            $timeout.cancel(scope.timoutId);
          }
          calculate();
          tick();
        }

        function updateNumber(newNumber) {
          if(attrs.currencyName && currenyNameExists(attrs.currencyName)) {
            e.textContent = formatNumberByCurrencyName(newNumber, attrs.currencyName);
          } else {
            e.textContent = newNumber;
          }
        }

        attrs.$observe('countTo', function (val) {
          if (val) {
            start();
          }
        });

        attrs.$observe('value', function (val) {
          start();
        });

        return true;
      }
    }

  }

  function currenyNameExists(currencyName) {
    try {
      getCurrencySymbolByCurrencyName(currencyName);
      return true;
    } catch(err) {
      return false;
    }
  }

  function getCurrencySymbolByCurrencyName(currencyName) {
    var currencySymbols = {
      'USD': '$', // US Dollar
      'EUR': '€', // Euro
      'CRC': '₡', // Costa Rican Colón
      'GBP': '£', // British Pound Sterling
      'ILS': '₪', // Israeli New Sheqel
      'INR': '₹', // Indian Rupee
      'JPY': '¥', // Japanese Yen
      'KRW': '₩', // South Korean Won
      'NGN': '₦', // Nigerian Naira
      'PHP': '₱', // Philippine Peso
      'PLN': 'zł', // Polish Zloty
      'PYG': '₲', // Paraguayan Guarani
      'THB': '฿', // Thai Baht
      'UAH': '₴', // Ukrainian Hryvnia
      'VND': '₫', // Vietnamese Dong
    };

    if(currencySymbols[currencyName]) {
      return currencySymbols[currencyName];
    } else {
      throw "That currency symbol does not exist, please add it!"
      return;
    }
  }

  /*
   * This function is derived from:
   * http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
   * Allows all Number types to format this as currency
   * 1000000.formatMoney(2, '.', ',') => 1,000,000.00
   */
  function formatMoney(number, c, d, t) {
    var formattedNumber, i, isNegative, j, n, s;
    n = number;
    isNegative = n < 0;
    c = (isNaN(c = Math.abs(c)) ? 2 : c);
    d = (d == null ? "." : d);
    t = (t == null ? "," : t);
    s = function(number) {
      if (isNegative) {
        return "-" + number;
      } else {
        return number;
      }
    };
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
    j = ((j = i.length) > 3 ? j % 3 : 0);
    formattedNumber = (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return s(formattedNumber);
  };

  function formatNumberByCurrencyName(number, currencyName) {
    var formattedNumber, yenNegative;
    var currencySymbol = getCurrencySymbolByCurrencyName(currencyName);
    formattedNumber = formatMoney(number, 0, '.', ',');
    if (formattedNumber.charAt(0) === '-') {
      return yenNegative = formattedNumber.replace("-", "-"+currencySymbol);
    } else {
      return currencySymbol + formattedNumber;
    }
  };

})(window, window.angular);

