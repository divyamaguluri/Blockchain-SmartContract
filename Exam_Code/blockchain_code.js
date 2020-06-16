var contractAddress = "0xe8e63985f425dd89de73fb690a1033315404dddf";
var accounts;

var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_fullname",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_course",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_score",
				"type": "uint256"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllStudentAdd",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "noOfStudents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "studentAccts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

console.log(contractAddress);

window.addEventListener('load',async()=>{
    if(window.ethereum){

        window.web3 = new Web3(ethereum);
        try{
            await ethereum.enable();
            if(typeof web3 !== "undefined"){
                web3 = new Web3(web3.currentProvider);
            }else {
                web3 = new Web3(new Web3.providers.httpProvider("https://rinkeby.infura.io/v3/a518d32cdcf2497994f77be0ee9c7471"))
            }
            
            accounts = await web3.eth.getAccounts();
            console.log(accounts);   
            web3.eth.defaultAccount = accounts[0];
			console.log(web3.eth.defaultAccount);
			StudentRecords = await new web3.eth.contract(abi, contractAddress);
            console.log(StudentRecords);
       
        } catch (error){
            console.log("error");
        }

        
    }else if(window.web3){
        window.web3 = new web3(web3.currentProvider);
    }else{
        alert("Try using Metamask browser");
        console.log("no ethereum in the browser");
    }
});

async function addtoBlockchain(){
   var fullname =$('#fullName').val();
   var course = $('#course').val();
   var score = $('#score').val();
   var studentAddress = $('#studentAddress').val();
   var htmlResult = '';
   console.log(fullname,course,score,studentAddress);

   StudentRecords.methods.addStudent(studentAddress , web3.utils.fromAscii(fullname) , web3.utils.fromAscii(course) , score).send({from:web3.eth.defaultAccount}).on('receipt',function(receipt){
    console.log(receipt);

    htmlResult = ` <div class="alert alert-success alert-dismissible">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
    <h5><i class="icon fas fa-check"></i> Transaction Successful </h5>
    Hash Number: ${receipt.transactionHash} 
  </div>`;
  $('#response').append(htmlResult); 
  $('#fullName').hide();
  $('#course').hide();
  $('#score').hide();
  $('#studentAddress').hide();

});
};