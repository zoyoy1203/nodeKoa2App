class A {
    constructor() {
        this.nameA = 'a';
    }
    validateA() {
        console.log("A");
    }
}

class B extends A {
    constructor() {
        super();
        this.nameB = 'b';
    }
    
    validateB() {
        console.log("B");
    }
}

class C extends B {
    constructor() {
        super();
        this.nameC = 'c';
    }

    validateC() {
        console.log("C");
    }
}

var c = new C();

//编写一个函数findMembers

const members = findMembers(c,'name','validate');
console.log(members);

//原型链  查找 递归