// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestStruct {
    struct Penson   {
        string name;
        uint8 age;
        Hobby[] hobbies;
    }

    struct Hobby {
        string label;
        string value;
    }

    Penson[] public persons;

    function addPenson (Penson calldata p ) public {
        persons.push(p);
    }

 
    function getPersons() public view returns( Penson[] memory) {
        return persons;
    }

       function getHobbies(uint256 index) public view returns (Hobby[] memory) {
        return getPersons()[index].hobbies;
    }

}