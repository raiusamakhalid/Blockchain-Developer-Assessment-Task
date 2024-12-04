// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title A basic ERC-20 Token implementation
contract BasicToken {
    string public name = "BasicToken";
    string public symbol = "BTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) private balances;
    mapping(address => mapping(address => uint256)) private allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /// @notice Mints new tokens to a specific address
    /// @param to The address to mint tokens to
    /// @param amount The amount of tokens to mint
    function mint(address to, uint256 amount) external {
        require(to != address(0), "Invalid address");
        totalSupply += amount;
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    /// @notice Transfers tokens from the sender to another address
    /// @param to The recipient address
    /// @param amount The amount of tokens to transfer
    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "Invalid address");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    /// @notice Gets the balance of an address
    /// @param account The address to query
    /// @return The balance of the address
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
