const { expect } = require("chai");

describe("BasicToken", function () {
    let BasicToken, token, owner, addr1, addr2;

    beforeEach(async function () {
        BasicToken = await ethers.getContractFactory("BasicToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await BasicToken.deploy();
        await token.deployed();
    });

    it("Should mint tokens correctly", async function () {
        await token.mint(addr1.address, 1000);
        expect(await token.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should transfer tokens correctly", async function () {
        await token.mint(addr1.address, 1000);
        await token.connect(addr1).transfer(addr2.address, 500);
        expect(await token.balanceOf(addr2.address)).to.equal(500);
        expect(await token.balanceOf(addr1.address)).to.equal(500);
    });
});
