const numberMap = {
		//Unidade
		0 : [
			 ''		//0
			,'I' 	//1
			,'II'	//2
			,'III'	//3
			,'IV'	//4
			,'V'	//5
			,'VI'	//6
			,'VII'	//7
			,'VIII'	//8
			,'IX'	//9				
			]
		//Dezena
		,1 : [
			 ''		//10
			,'X'	//10
			,'XX'   //20
			,'XXX'  //30
			,'XL'   //40
			,'L'    //50
			,'LX'   //60
			,'LXX'  //70
			,'LXXX' //80
			,'XC'   //90
			]
			,2 : [
			''
			,'C'	//100
			,'CC'   //200
			,'CCC'  //300				
			,'CD'   //400
			,'D'    //500
			,'DC'   //600
			,'DCC'  //700
			,'DCCC' //800
			,'CM' 	//900
			]
			,3 : [
			''
			,'M' //1000
			,'MM' //2000
			,'MMM' //3000
			]
		};
	//Obs número maximo é 3999
	
	//Conversão para algarismo romano
	function convertRoman(input){		

		input = input.replace(/[^0-9]/, "");
		if(input == '') return'';
		
		var number = parseInt(input);
		

		//Descobre se é Unidade, Dezena, Centana, Milhar
		var orderNumber = Number(input).toString();
		var orderLength = orderNumber.length;
		
		
		var unidadeDezenaCentena = orderLength - 1;
		
		
		var newOrder = '';
		for(var i = unidadeDezenaCentena; i >= 0 ;i--){
			newOrder = newOrder + orderNumber.charAt(i);
		}
		
		var finalCast = '';
		for(var i = unidadeDezenaCentena; i >= 0 ;i--){
			var auxVar = parseInt(newOrder.charAt(i));
			finalCast = finalCast + numberMap[i][auxVar];
		}
		
		return finalCast;
	}

	//Conversão para Números Inteiros
	function convertInteger(str) {
		var	str = str.toUpperCase(),
		validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
		token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
		key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
		num = 0, m;
		if (!(str && validator.test(str)))
			return false;
		while (m = token.exec(str))
			num += key[m[0]];
		return num;
	}

	
	//var numberToCast = 100;
	//var result = romanJs(numberToCast);


	//Tratamento da func algarismo romano
	function executaRoman(){
		document.getElementById("inteiro").addEventListener('keyup', function() {		
			var romanNumber = convertRoman(this.value);

			document.getElementById("romano").value = romanNumber;
		});
	}

	//Tratamento da func número inteiro
	function executaInteger(){
		document.getElementById("roman").addEventListener('keyup', function() {		
			var integerNumber = convertInteger(this.value);

			if(integerNumber == false){
				document.getElementById("roman").style = "text-transform: none";
				document.getElementById("roman").value = "";
				alert('O valor informado não é um algarismo romano valído!');
				document.getElementById("integer").value = "Aguarde o resultado...";
			}else{
				document.getElementById("roman").style = "text-transform: uppercase";
				document.getElementById("integer").value = integerNumber;
			}
		});
	}

	//validação de campos
	function validateNumber(num) {
		var er = /[^0-9]/;
		er.lastIndex = 0;
		var campo = num;
		if (er.test(campo.value)) {
			alert("informe apenas número inteiros com valor máximo até 3999!");
			campo.value = "";
		}
		if(campo.value > 3999){
			alert("informe um valor menor que 3999!");
			campo.value = "";
		}

	}

	//validação de campos
	function validateLetters(str) {
		var er = /[^ivxlcdm\IVXLCDM]/;
		validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
		er.lastIndex = "";
		var campo = str;
		if (er.test(campo.value)) {
			alert("informe apenas algarismos romanos!");
			campo.value = "";
		}
		if(campo.value == ""){
			document.getElementById("roman").style = "text-transform: none !important";
		}
	}

	executaRoman();
	executaInteger();