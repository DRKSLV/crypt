console.log('Hello World!');

const input=document.querySelector("#input");
const key=document.querySelector("#key");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");
const title = document.querySelector("#title");
const algorithm = document.querySelector("#algorithm");

const luni = new Lunicode();

encrypt.addEventListener("click", (evt) => {
    click(false);
});
decrypt.addEventListener("click", (evt) => {
    click(true);
});

algorithm.addEventListener("change", (evt) => {
    title.innerHTML = `${evt.target.value.toUpperCase()} Encryption`;
    switch(evt.target.value) {
        case "vigenere":
            key.type="text"
        break;
        case "ceasar":
            key.type="number"
        break;
    }
});

function click(reverse) {
    var string = input.value;
    input.classList.add("matrix");
    var iteration=0;

    var interval = setInterval(() => {

        input.value = luni.tools.creepify.encode(verCaesar(Math.floor(Math.random()*25), string, false));
    }, 100);

    setTimeout(() => {
        switch(algorithm.value) {
            case "vigenere":
                input.value= vigenere(key.value||"a", string, reverse);
                break;
            case "ceasar":
                input.value= verCaesar(parseInt(key.value)||0, string, reverse);
                break;
            input.value= string;
        }
        input.classList.remove("matrix");
        clearInterval(interval);
    }, 1000);
    
}

function vigenere(key, string, reverse=false) {
    return mapChars(string, (c, i)=> {
        while(i>=key.length)
            i-=key.length;
        var code = key.charCodeAt(i);
        var up = code>=65&&code<=90;
        var low = code>=97&&code<=122;
        var n=0;   

        if(up||low) {
            code-= up?65:97;
            n=code;
        }

        return wrap(c, n, reverse)
    });
}

/**
 * Offsets char code alphabetically by n spaces
 * @param {*} code 
 * @param {*} n 
 * @param {*} reverse 
 */
function wrap(code, n, reverse=false) {
    var up = code>=65&&code<=90;
    var low = code>=97&&code<=122;
    if(!up&&!low) 
        return code;

    code-= up?65:97;
    code+= reverse?(-n):(n);
    while (code>25)
        code-=26
    while (code<0)
        code+=26
    code+= up?65:97;
    return code;
}

/**
 * Ceasar encryption
 * @param {*} n 
 * @param {*} string 
 * @param {*} reverse 
 */
function verCaesar(n, string, reverse) {
    string=mapChars(string, (c)=> wrap(c, n, reverse));
    return string;
} 

/**
 * for each char execute function that modifies char
 * @param {*} string 
 * @param {*} func 
 */
function mapChars(string, func) {
    for (var i=0; i<string.length; i++) {
        var char = string.charCodeAt(i);
        char = func(char, i);
        var charS = String.fromCharCode(char);
        string = string.substr(0, i) + charS + string.substr(i+1)
    }
    return string;
}