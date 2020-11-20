console.log('Hello World!');

const input=document.querySelector("#input");
const key=document.querySelector("#key");
const encrypt = document.querySelector("#encrypt");
const decrypt = document.querySelector("#decrypt");

const luni = new Lunicode();

encrypt.addEventListener("click", (evt) => {
    click(false);
});
decrypt.addEventListener("click", (evt) => {
  click(true);
});

function click(reverse) {
    var string = input.value;
    input.classList.add("matrix");
    var iteration=0;

    var interval = setInterval(() => {

        input.value = luni.tools.creepify.encode(verCaesar(Math.floor(Math.random()*25), string, false));
    }, 100);

    setTimeout(() => {
        input.value = verCaesar(parseInt(key.value) ||0, string, reverse);
        input.classList.remove("matrix");
        clearInterval(interval);
    }, 1000);
    
}

function verCaesar(n, string, reverse) {
    function wrap(code, n, reverse=false) {
        var up = code>=65&&code<=90;
        var low = code>=97&&code<=122;
        if(!up&&!low) 
            return code;

        code-= up?65:97;
        code+= reverse?(-n):(n);
        while (code>25)
            code-=25
        while (code<0)
            code+=25
        code+= up?65:97;
        return code;
    }
    for (var i=0; i<string.length; i++) {
        var char = string.charCodeAt(i);
        char = wrap(char, n, reverse);
        var charS = String.fromCharCode(char);
        string = string.substr(0, i) + charS + string.substr(i+1)
    }
    return string;
} 