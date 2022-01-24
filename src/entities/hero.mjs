export class Hero {
    constructor({ id, name, age, power }) {
         this.id = Math.floor(Math.random() * 100) + Date.now();
         this.name = name;
         this.age = age;
         this.power = power;
    }
    
    isValid() {
        const propertNames = Object.getOwnPropertyNames(this);
        const amountInvalid = propertNames
        .map(property => (!!this[property]) ? null : `${property} is missing!`)
        .filter(item => !!item);

       return {
           valid: amountInvalid.length === 0,
           error: amountInvalid
       }
    }
}

// const hero = new Hero({ name: "kk", age: 15, power: "kkkk" })
// console.log(hero.isValid());