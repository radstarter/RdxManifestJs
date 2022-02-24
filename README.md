# RdxManifestJs
## Scope
Build a transaction manifest quickly by chaining method calls
#### example: 
```
const manifestString = new TransactionBuilder()
  .callFunction('37793849342234324234', 'GumballMachine', 'new', ['Decimal("1.2)'])
  .callMethod('3774463463434638434', 'buy_gumball', ['some_arg', 'another_arg'])
  .build();
console.log(manifestString);
```
## Limitations
You still need to write the type manually for function calls, and no second layer utilitys have been implemented yet. Validation of Addresses, Decimals and Ids still needs to be done.


Contributions welcome.


License: None
