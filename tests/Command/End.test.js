var	CommandEnd = require('../../Command/End'),
	chai = require('chai'),
    sinon = require('sinon'),
    fs = require('fs');

describe("End", function(){

	describe("execute", function() {

		function getLogstrip()
		{
			return sinon.spy();
		}

		function getVersiony(files)
		{
			return {model:{
				files : function(){
					return files;
				},
				get : function(){
					return 'version@';
				},
				reset : function(){}
			}};
		}

		it('testing execute with files', function() {
			//Given
			var logStrip = getLogstrip();

			var files = ['teste','teste'];
			var versiony = getVersiony(files);

			//When
			var result = new CommandEnd(logStrip,versiony).execute();

			//Then
			var expected = {
				files: files,
				version: 'version@'
			};

			chai.assert.deepEqual(expected, result);
			chai.assert.equal(3, logStrip.callCount);
		});

		it('testing execute without files', function() {
			// Given
			var logStrip = getLogstrip();

			var files = [];
			var versiony = getVersiony(files);

			//When
			var result = new CommandEnd(logStrip,versiony).execute();

			//Then
			var expected = {
				files: files,
				version: 'version@'
			};

			chai.assert.deepEqual(expected, result);
			chai.assert.equal(2, logStrip.callCount);
		});
	});


});