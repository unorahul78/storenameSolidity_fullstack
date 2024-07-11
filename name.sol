// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;

contract Namestore 
{
        string name="";

      
    
    function getter() public view returns (string memory)
    {
        return name;
    }

    function setter(string memory _name) public {
        name = _name; 
    }


}