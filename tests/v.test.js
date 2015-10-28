var	versiony = require('../v'),
	chai = require('chai'),
    sinon = require('sinon'),
    fs = require('fs');

describe("Versiony", function(){
	
	describe("end", function() {

		beforeEach(function(){
			 var initVersionFile = {
			    "major": 0,
			    "minor": 0,
			    "patch": 0
			};

			fs.writeFileSync("tests/version.js", JSON.stringify(initVersionFile));

		});
		
		it("Increase minor version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.minor()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal(1, versionFile.minor);
		});

		it("Increase major version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.major()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal(1, versionFile.major);
		});

		it("Increase patch version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.patch()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal(1, versionFile.patch);
		});

	});



	describe("end with dot versions", function() {

		beforeEach(function(){
			 var initVersionFile = {
			    "version": "0.0.0"
			};

			fs.writeFileSync("tests/version.js", JSON.stringify(initVersionFile));
		});


		
		it("Increase minor version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.minor()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal("0.1.0", versionFile.version);
		});

		it("Increase major version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.major()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal("1.0.0", versionFile.version);
		});

		it("Increase patch version", function(){

			//Given
			var file = "tests/version.js";

			//When
			versiony
				.patch()
				.from(file)
				.to()
				.end();

			//Then
			var returnFile = fs.readFileSync(file);
			var versionFile = JSON.parse(returnFile);
			chai.assert.equal("0.0.1", versionFile.version);
		});

	});


});