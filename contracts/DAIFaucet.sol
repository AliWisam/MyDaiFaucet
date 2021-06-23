//SPDX-License-Identifier: UNLICENSED
/**
 * @title Generic DaiFaucet Contract
 * @dev InsureNET Decentralized Insurance Platform DaiFaucet Contract.
 * @author Jason Romero
 * @copyright 2020 InsureNET
 */

pragma solidity >=0.4.22 <0.7.0;

interface DaiToken {
    function transfer(address dst, uint wad) external returns(bool);
    function balanceOf(address guy) external view returns(uint);
}


contract owned {
    DaiToken daitoken;
	address owner;

	constructor() public{
		owner = msg.sender;
		daitoken = DaiToken(0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735);
	}

	modifier onlyOwner {
		require(msg.sender == owner, "Only the contract owner can call this function");
		_;
	}
}


contract mortal is owned {
	// Only owner can shutdown this contract.
	function destroy() public onlyOwner {
	    daitoken.transfer(owner, daitoken.balanceOf(address(this)));
	    selfdestruct(msg.sender);
	}
}


contract DaiFaucet is mortal {

	event Send(address indexed to, uint amount);
	event Deposit(address indexed from, uint amount);
	// Give out Dai to anyone who asks
	function send(address accountToSend, uint amountToSend) public {
		// Limit withdrawal amount
		require(amountToSend <= 0.1 ether, "big amount");
		require(daitoken.balanceOf(address(this)) >= amountToSend,
			"Insufficient balance in faucet for withdrawal request");
		// Send the amount to the address that requested it
		daitoken.transfer(accountToSend, amountToSend);
		emit Send(accountToSend, amountToSend);
	}
	
	function daiBalance(address guy) public view returns(uint){
	    
	   return daitoken.balanceOf(guy);
	    
	}
	

	// Accept any incoming amount
	function accetpIncoming() external payable onlyOwner {
		emit Deposit(msg.sender, msg.value);
	}
}





