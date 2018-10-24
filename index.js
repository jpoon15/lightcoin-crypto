class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }
//For..in - Object key value pairs
//for..of


  get balance() {
    let balance = 0;
    for (let i of this.transaction) {
      balance += i.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transaction.push(transaction)
  }
}

/*
transaction object that is pushed into array, looks something like this?

transaction: {
  this account: snow-patrol,
  this.amount: $50.25 // this.value: -this.amount (after Withdraw function)
  this time: new date()
}

to get balance, what to focus on value. Can't use for ... in, must use for ... of

*/



class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  //action that deducts from account balance
  commit() {
    if (!this.isAllowed()) {
      console.log("================")
      console.log("Action Rejected!")
      console.log("================")
      return false
    }
      console.log("================")
      console.log("Action Accepted!")
      console.log("================")
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
  }
}


class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0)
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log("================")
console.log("myAccount Summary:", myAccount)

console.log("Going to Withdrawal")
t1 = new Withdrawal(50.25, myAccount);
t1.commit(); //Returns Rejected
console.log("t1 Summary:", t1)
console.log("myAccount:", myAccount)
console.log('New Balance after T1:', myAccount.balance);


console.log("Going to Withdrawal")
t2 = new Withdrawal(9.99, myAccount);
t2.commit(); // Returns Rejected
console.log("t2 Summary:", t2)
console.log("myAccount:", myAccount)
console.log('New Balance after T2:', myAccount.balance);

console.log("Going to Deposit")
t3 = new Deposit(120.00, myAccount);
t3.commit(); //
console.log("t3 Summary:", t3)
console.log("myAccount:", myAccount)
console.log('New Balance after T3:', myAccount.balance);





