pragma solidity 0.4.24;

/**
 * @title BITTOStandard
 * @dev the interface of BITTOStandard
 */
 
contract BITTOStandard {
    uint256 public stakeStartTime;
    uint256 public stakeMinAge;
    uint256 public stakeMaxAge;
    function mint() public returns (bool);
    function coinAge() constant public returns (uint256);
    function annualInterest() constant public returns (uint256);
    event Mint(address indexed _address, uint _reward);
}
