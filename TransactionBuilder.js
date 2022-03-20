class TransactionBuilder {
  constructor() {
    this.transactions = [];
  }

  // First level worktop interaction
  takeFromWorktop(amount, resourceAddress, bucket) {
    if (
      this.validateDecimal(amount) &&
      this.validateResource(resourceAddress)
    ) {
      this.transactions.push(
        `TAKE_FROM_WORKTOP\n    Decimal("${amount}")\n    Address("${resourceAddress}")\n    Bucket("${bucket}");`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at takeFromWorktop(${len})`);
    }

    return this;
  }

  takeAllFromWorktop(resourceAddress, bucket) {
    if (this.validateResource(resourceAddress)) {
      this.transactions.push(
        `TAKE_ALL_FROM_WORKTOP\n    Address("${resourceAddress}")\n    Bucket("${bucket}");`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at takeAllFromWorktop(${len})`);
    }

    return this;
  }

  takeNonFungiblesFromWorktop(ids, resourceAddress, bucket) {
    if (this.validateIds(ids) && this.validateResource(resourceAddress)) {
      let treeSet = "TreeSet<NonFungibleKey> (";
      for (const id of ids) {
        treeSet += `NonFungibleKey("${id}"),`; //Trailing comma need to see if it works, otherwise c style for
      }
      treeSet += ")";

      this.transactions.push(
        `TAKE_NON_FUNGIBLES_FROM_WORKTOP\n    ${treeSet}\n    Address("${resourceAddress}")\n    Bucket("${bucket}");`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at takeNonFungiblesFromWorktop(${len})`);
    }

    return this;
  }

  returnToWorktop(bucket) {
    this.transactions.push(`RETURN_TO_WORKTOP\n    Bucket("${bucket}");`);

    return this;
  }

  assertWorktopContains(amount, resourceAddress) {
    if (
      this.validateDecimal(amount) &&
      this.validateResource(resourceAddress)
    ) {
      this.transactions.push(
        `ASSERT_WORKTOP_CONTAINS\n    Decimal("${amount}")\n    Address("${resourceAddress}");`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at assertWorktopContains(${len})`);
    }

    return this;
  }

  // First level bucket interaction
  createBucketRef(bucket, bucketRef) {
    this.transactions.push(
      `CREATE_BUCKET_REF\n    Bucket("${bucket}")\n    BucketRef("${bucketRef}");`
    );
    return this;
  }

  cloneBucketRef(bucketRef, bucketRefNew) {
    this.transactions.push(
      `CLONE_BUCKET_REF\n    BucketRef("${bucketRef}")\n    BucketRef("${bucketRefNew}");`
    );
    return this;
  }

  dropBucketRef(bucketRef) {
    this.transactions.push(`DROP_BUCKET_REF\n    BucketRef("${bucketRef}");`);

    return this;
  }

  // First level instance interaction
  // account ignored v0.1
  callFunction(packageAddress, blueprintName, functionName, args, account) {
    if (this.validatePackage(packageAddress)) {
      let argString = args.join("\n    ");
      this.transactions.push(
        `CALL_FUNCTION\n    Address("${packageAddress}")\n    "${blueprintName}"\n    "${functionName}"\n    ${argString};`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at callFunction(${len})`);
    }
    return this;
  }

  callMethod(componentAddress, methodName, args, account) {
    if (this.validateComponent(componentAddress)) {
      let argString = args.join("\n    ");
      this.transactions.push(
        `CALL_METHOD\n    Address("${componentAddress}")\n    "${methodName}"\n    ${argString};`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at callMethod(${len})`);
    }
    return this;
  }

  callMethodWithAllResources(componentAddress, methodName, args, account) {
    if (this.validateComponent(componentAddress)) {
      let argString = args.join("\n    ");
      this.transactions.push(
        `CALL_METHOD_WITH_ALL_RESOURCES\n    Address("${componentAddress}")\n    "${methodName}"\n    ${argString};`
      );
    } else {
      let len = this.transactions.length;
      throw new Error(`Invalid params at callMethodWithAllResources(${len})`);
    }

    return this;
  }

  // Some second layer utility
  withdraw(accountAddress, amount, resourceAddress, bucketRef) {
    //TODO
    return this;
  }

  // Build the transaction manifest
  build() {
    let manifest = this.transactions.join("\n\n");
    return manifest; // return the generated text
  }

  validatePackage(address) {
    return true;
  }

  validateComponent(component) {
    return true;
  }

  validateResource(resourceDef) {
    return true;
  }
  validateDecimal(dec) {
    var regex = /Decimal\("(-)?(\d)+(\.(\d)+)?"\)/;
    return String(dec).match(regex)!=null
  }
  validateIds() {
    return true;
  }
}
