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
    this.time = new Date();
    this.account.addTransaction(this);
  }
}



class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log("myAccount:", myAccount)
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log("t1 Summary:", t1)
console.log("myAccount:", myAccount)
console.log('New Balance after T1:', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log("t2 Summary:", t2)
console.log("myAccount:", myAccount)
console.log('New Balance after T2:', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log("t3 Summary:", t3)
console.log("myAccount:", myAccount)
console.log('New Balance after T3:', myAccount.balance);





