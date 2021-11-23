// SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.7;

interface IERC20 {
    function transferFrom(address _from, address _to, uint256 _amount) external returns (bool);
    function balanceOf(address _account) external view returns (uint256);
    function mint(address to, uint amount) external;
}

interface IERC721 {
    function balanceOf(address _account) external view returns (uint256);
}

contract WikiDAO {
                                            
    address wikiTokenAddress = 0xcD6a42782d230D7c13A74ddec5dD140e55499Df9;
    address wikiAuthorAddress = 0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c;
    
    IERC20 wikiTokenContract = IERC20(wikiTokenAddress);
    IERC721 wikiAuthorContract = IERC721(wikiAuthorAddress);
    
   
    
    
    // mapping: author (address) to entries (bytes32[])
    // see which entries have been added by whom
    mapping (address => bytes32[]) private _authorToEntries;
    
    // mapping: entry (bytes32) to address (address)
    // see who added the entry
    mapping (bytes32 => address) private _entryToAuthor;
    
    // mapping: entryNumber (uint32) to entry (bytes32)
    mapping (uint32 => bytes32) private _entryNumberToEntry;
    
    // mapping: entryToEntryNumber
    mapping (bytes32 => uint32) private _entryToEntryNumber;
    
    // uint256: numEntries
    // how many entries are in the database
    uint32 public numEntries = 0;
    
    function addEntry(string memory _title, string memory _author) public {
    
        // 1. require that recipient is an author
        require(wikiAuthorContract.balanceOf(msg.sender) > 0, "Must be an author to add entry");
        // 2. hash the entry data
        bytes32 entryHash = hashEntryData(_title, _author);
        // 3. require that the hash is unique
        require(_entryToEntryNumber[entryHash] == 0, "Entry already exists");
        
        
        // 4. create a new Entry
        _entryToEntryNumber[entryHash] = numEntries;
        _entryNumberToEntry[numEntries] = entryHash;
        numEntries++;
        _entryToAuthor[entryHash] = msg.sender;
        // 5. Add entry to author array
        _authorToEntries[msg.sender].push(entryHash);
        // 6. mint X number of WIKIT
        wikiTokenContract.mint(msg.sender, 10);
    }
    
    function hashEntryData(string memory _title, string memory _author) internal pure returns (bytes32){
        return keccak256(abi.encode(_title, _author));
    }    
}



